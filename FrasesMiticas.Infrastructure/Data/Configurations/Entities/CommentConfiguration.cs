using FrasesMiticas.Core.Aggregates.Quotes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FrasesMiticas.Infrastructure.Data.Configurations.Entities
{
    public class CommentConfiguration : EntityConfiguration<int, QuoteComment>
    {
        public override void Configure(EntityTypeBuilder<QuoteComment> builder)
        {
            builder.Property(a => a.Id)
                .HasColumnName("id")
                .IsRequired();

            builder.Property(a => a.UserId)
                .HasColumnName("user_id")
                .IsRequired();

            builder.Property(a => a.QuoteId)
                .HasColumnName("quote_id")
                .IsRequired();

            builder.Property(a => a.Date)
                .HasColumnName("comment_date")
                .IsRequired()
                .HasConversion(
                    v => DateTimeToUnixSeconds(v),
                    v => UnixSecondsToDateTime(v));

            builder.Property(a => a.Text)
                .HasColumnName("comment_text");

            builder.HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(e => e.Quote)
                .WithMany(e => e.Comments)
                .HasForeignKey(e => e.QuoteId)
                .OnDelete(DeleteBehavior.Cascade);

            base.Configure(builder);
            builder.ToTable("comments");
        }
    }
}
