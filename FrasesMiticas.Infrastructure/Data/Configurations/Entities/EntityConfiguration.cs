﻿using FrasesMiticas.Core.Aggregates;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace FrasesMiticas.Infrastructure.Data.Configurations.Entities
{
    public abstract class EntityConfiguration<TKey, TEntity> : IEntityTypeConfiguration<TEntity> where TEntity : Entity<TKey>
    {
        public virtual void Configure(EntityTypeBuilder<TEntity> builder)
        {
            builder.HasKey(a => a.Id);
        }

        protected static long DateTimeToUnixSeconds(DateTime dateTime)
        {
            DateTime baseDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            return (long)dateTime.Subtract(baseDateTime).TotalSeconds;
        }

        protected static DateTime UnixSecondsToDateTime(double unixTimeStamp)
        {
            DateTime dateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dateTime = dateTime.AddSeconds(unixTimeStamp).ToUniversalTime();
            return dateTime;
        }
    }
}
