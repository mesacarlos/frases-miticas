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
                .HasColumnName("phrase_author");

            builder.Property(a => a.Date)
                .HasColumnName("phrase_date")
                .HasConversion(
                    v => DateTimeToUnixSeconds(v),
                    v => UnixSecondsToDateTime(v));

            builder.Property(a => a.Text)
                .HasColumnName("phrase_text");

            builder.Property(a => a.Context)
                .HasColumnName("phrase_context");

            builder.HasMany(s => s.InvolvedUsers)
                .WithMany(e => e.InvolvedPhrases)
                .UsingEntity(
                    "user_phrases",
                    l => l.HasOne(typeof(AppUser)).WithMany().HasForeignKey("user_id").HasPrincipalKey(nameof(AppUser.Id)),
                    r => r.HasOne(typeof(Quote)).WithMany().HasForeignKey("phrase_id").HasPrincipalKey(nameof(Quote.Id)),
                    j => j.HasKey("phrase_id", "user_id"));

            base.Configure(builder);
            builder.ToTable("phrases");
        }
    }
}
