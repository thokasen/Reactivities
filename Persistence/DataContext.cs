using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);

            builder.
            Entity<Value>().
            HasData(
                new Value { Id = 1, Name = "Value 101" },
                new Value { Id = 2, Name = "Value 102" },
                new Value { Id = 3, Name = "Value 103" }
                );

            builder.Entity<UserActivity>(x => x.HasKey(userActivity =>
            new { userActivity.AppUserId, userActivity.ActivityId }));

            builder.Entity<UserActivity>().
            HasOne(userAct => userAct.AppUser).
            WithMany(appUser => appUser.UserActivities).
            HasForeignKey(userAct => userAct.AppUserId);

            builder.Entity<UserActivity>().
            HasOne(userAct => userAct.Activity).
            WithMany(activity => activity.UserActivities).
            HasForeignKey(userAct => userAct.ActivityId);
        }
    }
}
