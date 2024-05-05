using FrasesMiticas.Core.Aggregates.AppUsers;
using FrasesMiticas.Core.Aggregates.Quotes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FrasesMiticas.Infrastructure.Data.Configurations.Entities
{
    public class QuotesConfiguration : EntityConfiguration<int, Quote>
    {
        public override void Configure(EntityTypeBuilder<Quote> builder)
        {
            builder.Property(a => a.Id)
                .HasColumnName("id")
                .IsRequired();

            builder.Property(a => a.Author)
                .HasColumnName("quote_author");

            builder.Property(a => a.Date)
                .HasColumnName("quote_date")
                .HasConversion(
                    v => DateTimeToUnixSeconds(v),
                    v => UnixSecondsToDateTime(v));

            builder.Property(a => a.Text)
                .HasColumnName("quote_text");

            builder.Property(a => a.Context)
                .HasColumnName("quote_context");

            builder.HasMany(s => s.InvolvedUsers)
                .WithMany(e => e.InvolvedQuotes)
                .UsingEntity(
                    "quotes_users",
                    l => l.HasOne(typeof(AppUser))
                        .WithMany()
                        .HasForeignKey("user_id")
                        .OnDelete(DeleteBehavior.Cascade),
                    r => r.HasOne(typeof(Quote))
                        .WithMany()
                        .HasForeignKey("quote_id")
                        .OnDelete(DeleteBehavior.Cascade),
                    j => j.HasKey("quote_id", "user_id"));

            base.Configure(builder);
            builder.ToTable("quotes");
        }
    }
}
