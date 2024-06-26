﻿using FrasesMiticas.Core.Aggregates.Quotes;
using FrasesMiticas.Core.Dtos;
using FrasesMiticas.Core.Dtos.Quotes;
using FrasesMiticas.Core.Exceptions;
using FrasesMiticas.Core.Interfaces;
using FrasesMiticas.Core.Interfaces.Repositories;
using FrasesMiticas.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FrasesMiticas.Core.Services
{
    public class QuoteService : IQuoteService
    {
        private readonly IMapper mapper;
        private readonly IQuoteRepository repository;
        private readonly IAppUserRepository appUserRepository;

        public QuoteService(IMapper mapper,
                                IQuoteRepository repository,
                                IAppUserRepository appUserRepository)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.appUserRepository = appUserRepository;
        }

        public QuoteDto Add(QuoteDto dto)
        {
            Quote entity = mapper.Map<Quote>(dto);
            entity.InvolvedUsers = appUserRepository.GetByIds(dto.InvolvedUsers.Select(e => e.Id).ToList());
            repository.Add(entity);

            return mapper.Map<QuoteDto>(entity);
        }

        public QuoteDto Update(int id, QuoteDto dto)
        {
            Quote entity = repository.Get(id);
            if (entity == null)
                throw new EntityNotFoundException($"A quote with ID {id} was not found");

            //Validation successful. Update fields.
            entity.Author = dto.Author;
            entity.Date = dto.Date;
            entity.Text = dto.Text;
            entity.Context = dto.Context;
            entity.InvolvedUsers = appUserRepository.GetByIds(dto.InvolvedUsers.Select(e => e.Id).ToList());

            //Save to persistence
            repository.Update(entity);

            return mapper.Map<QuoteDto>(entity);
        }

        public PagedResultDto<QuoteDto> GetPaginated(QuoteFilterDto filter)
        {
            IEnumerable<Quote> entities = repository.Get();

            // Apply filters
            if (!string.IsNullOrEmpty(filter.Text))
                entities = entities.Where(e => e.Text?.Contains(filter.Text, StringComparison.InvariantCultureIgnoreCase) == true
                                            || e.Context?.Contains(filter.Text, StringComparison.InvariantCultureIgnoreCase) == true);

            if (filter.FromDate != null)
                entities = entities.Where(e => e.Date > filter.FromDate);

            if (filter.ToDate != null)
                entities = entities.Where(e => e.Date < filter.ToDate);

            if (filter.InvolvedUsers.Any())
                entities = entities.Where(e => e.InvolvedUsers.Any(e => filter.InvolvedUsers.Contains(e.Id)));

            if (filter.ReactedWith.Any())
                entities = entities.Where(e => e.Reactions.Any(r => filter.ReactedWith.Contains(r.Type)));

            int totalItems = entities.Count();
            //If PageNumber or PageSize are not valid, return all data
            if (filter.PageIndex <= 0 || filter.PageSize <= 0)
            {
                var dtos = entities.Select(e => mapper.Map<QuoteDto>(e)).ToList();
                return new PagedResultDto<QuoteDto>(dtos, 1, -1, totalItems);
            }
            
            //Return queried page
            var pagedDtos = entities
               .Skip((filter.PageIndex - 1) * filter.PageSize)
               .Take(filter.PageSize)
               .Select(e => mapper.Map<QuoteDto>(e))
               .ToList();
            return new PagedResultDto<QuoteDto>(pagedDtos, filter.PageIndex, filter.PageSize, totalItems);
        }

        public QuoteDto Get(int id)
        {
            Quote entity = repository.Get(id);

            if (entity == default)
                throw new EntityNotFoundException<Quote>(id);


            var dto = mapper.Map<QuoteDto>(entity);

            return dto;
        }

        public void Delete(int id)
        {
            repository.Delete(id);
        }

        public QuoteCommentDto AddComment(int quoteId, QuoteCommentDto dto)
        {
            Quote entity = repository.Get(quoteId);
            if (entity == null)
                throw new EntityNotFoundException($"A quote with ID {quoteId} was not found");

            var newComment = mapper.Map<QuoteComment>(dto);
            entity.Comments.Add(newComment);
            repository.Update(entity);

            return mapper.Map<QuoteCommentDto>(newComment);
        }

        public QuoteCommentDto UpdateComment(int quoteId, int commentId, QuoteCommentDto dto)
        {
            Quote entity = repository.Get(quoteId);
            if (entity == null)
                throw new EntityNotFoundException($"A quote with ID {quoteId} was not found");

            var comment = entity.Comments.SingleOrDefault(e => e.Id == commentId);
            if (comment == null)
                throw new EntityNotFoundException($"A quote comment with ID {commentId} was not found");
            
            comment.Text = dto.Text;

            repository.Update(entity);

            return mapper.Map<QuoteCommentDto>(comment);
        }

        public void DeleteComment(int quoteId, int commentId)
        {
            Quote entity = repository.Get(quoteId);
            if (entity == null)
                throw new EntityNotFoundException($"A quote with ID {quoteId} was not found");

            var comment = entity.Comments.SingleOrDefault(e => e.Id == commentId);
            if (comment == null)
                throw new EntityNotFoundException($"A quote comment with ID {commentId} was not found");

            entity.Comments.Remove(comment);

            repository.Update(entity);
        }

        public QuoteReactionDto AddReaction(int quoteId, QuoteReactionDto dto)
        {
            Quote entity = repository.Get(quoteId);
            if (entity == null)
                throw new EntityNotFoundException($"A quote with ID {quoteId} was not found");

            if (entity.Reactions.Any(e => e.UserId == dto.UserId && e.Type == dto.Type))
                throw new InvalidRequestException($"Quote with ID {quoteId} already reacted with this reaction type by this user.");

            var newReaction = mapper.Map<QuoteReaction>(dto);
            entity.Reactions.Add(newReaction);
            RemoveInvalidReactions(dto, entity.Reactions);
            repository.Update(entity);

            return mapper.Map<QuoteReactionDto>(newReaction);
        }

        private void RemoveInvalidReactions(QuoteReactionDto newReaction, ICollection<QuoteReaction> reactions)
        {
            switch (newReaction.Type)
            {
                case ReactionType.Like:
                case ReactionType.Love:
                    RemoveReactions(reactions, ReactionType.Dislike);
                    break;
                case ReactionType.Dislike:
                    RemoveReactions(reactions, ReactionType.Like, ReactionType.Love);
                    break;
            }
        }

        private void RemoveReactions(ICollection<QuoteReaction> reactions, params ReactionType[] reactionsToDelete)
        {
            foreach (var r in reactionsToDelete)
            {
                var oldReaction = reactions.FirstOrDefault(e => e.Type == r);
                reactions.Remove(oldReaction);
            }
        }

        public void DeleteReaction(int quoteId, int userId, ReactionType type)
        {
            Quote entity = repository.Get(quoteId);
            if (entity == null)
                throw new EntityNotFoundException($"A quote with ID {quoteId} was not found");

            var reaction = entity.Reactions.SingleOrDefault(e => e.UserId == userId && e.Type == type);
            if (reaction == null)
                throw new EntityNotFoundException($"No reaction with this information was found.");

            entity.Reactions.Remove(reaction);

            repository.Update(entity);
        }
    }
}
