using FrasesMiticas.Core.Aggregates.Quotes;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace FrasesMiticas.Infrastructure.Data.Configurations.Entities
{
    public class ReactionConfiguration : IEntityTypeConfiguration<QuoteReaction>
    {
        public void Configure(EntityTypeBuilder<QuoteReaction> builder)
        {
            builder.HasKey(e => new { e.UserId, e.QuoteId, e.Type });

            builder.Property(a => a.UserId)
                .HasColumnName("user_id")
                .IsRequired();

            builder.Property(a => a.QuoteId)
                .HasColumnName("quote_id")
                .IsRequired();

            builder.Property(a => a.Type)
                .HasColumnName("reaction_type")
                .IsRequired()
                .HasConversion(
                    v => ReactionTypeToInt(v),
                    v => IntToReactionType(v));

            builder.HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(e => e.Quote)
                .WithMany(e => e.Reactions)
                .HasForeignKey(e => e.QuoteId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.ToTable("reactions");
        }

        protected static int ReactionTypeToInt(ReactionType src)
        {
            return (int)src;
        }

        protected static ReactionType IntToReactionType(int src)
        {
            return (ReactionType)src;
        }
    }
}
