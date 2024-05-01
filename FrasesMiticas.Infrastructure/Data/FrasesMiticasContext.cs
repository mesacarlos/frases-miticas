using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace FrasesMiticas.Infrastructure.Data
{
    public class FrasesMiticasContext : DbContext
    {
        public FrasesMiticasContext(DbContextOptions options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var currentAssembly = Assembly.GetExecutingAssembly();
            modelBuilder.ApplyConfigurationsFromAssembly(currentAssembly);
        }
    }
}
