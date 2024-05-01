using FrasesMiticas.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrasesMiticas.Api.Filters
{
    public class TransactionActionFilter : IActionFilter
    {
        private readonly FrasesMiticasContext dbContext;


        public TransactionActionFilter(FrasesMiticasContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (dbContext.Database.CurrentTransaction == null)
                dbContext.Database.BeginTransaction();
        }


        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Exception == null)
                dbContext.Database.CommitTransaction();

            else
                dbContext.Database.RollbackTransaction();
        }

    }
}
