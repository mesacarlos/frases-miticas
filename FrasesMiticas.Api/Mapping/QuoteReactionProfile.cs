using AutoMapper;
using FrasesMiticas.Api.ViewModels.Responses;
using FrasesMiticas.Core.Dtos.Quotes;

namespace FrasesMiticas.Api.Mapping
{
    public class QuoteReactionProfile : Profile
    {
        public QuoteReactionProfile()
        {
            CreateMap<QuoteReactionDto, QuoteReactionResponse>()
                .ForCtorParam(
                    nameof(QuoteReactionResponse.Type),
                    opt => opt.MapFrom(src => FirstCharToLower(src.Type.ToString()))
                );
        }

        private static string FirstCharToLower(string input)
        {
            if (string.IsNullOrEmpty(input))
                return input;

            return char.ToLower(input[0]) + input.Substring(1);
        }
    }
}
