using FrasesMiticas.Core.Aggregates.AppUsers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FrasesMiticas.Infrastructure.Data.Configurations.Entities
{
    public class AppUsersConfiguration : EntityConfiguration<int, AppUser>
    {
        public override void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder.Property(a => a.Id)
                .HasColumnName("id")
                .IsRequired();

            builder.Property(a => a.Username)
                .HasColumnName("username");

            builder.Property(a => a.Email)
                .HasColumnName("email");

            builder.Property(a => a.Password)
                .HasColumnName("password");

            builder.Property(a => a.FullName)
                .HasColumnName("full_name");


            builder.Property(a => a.IsSuperAdmin)
                .HasColumnName("is_superadmin")
                .HasConversion(
                    v => v ? 1 : 0,
                    v => v == 1);

            base.Configure(builder);
            builder.ToTable("users");
        }
    }
}
