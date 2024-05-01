using FrasesMiticas.Core.Aggregates.FrasesMiticas;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FrasesMiticas.Infrastructure.Data.Configurations.Entities
{
    public class FrasesMiticasConfiguration : EntityConfiguration<int, FraseMitica>
    {
        public override void Configure(EntityTypeBuilder<FraseMitica> builder)
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

            builder.Property(a => a.Subtitle)
                .HasColumnName("phrase_subtitle");

            base.Configure(builder);
            builder.ToTable("frases");
        }
    }
}
