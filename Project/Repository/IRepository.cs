using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace MobileWeb.Repository
{
    public interface IRepository<T> : IDisposable
    where T : class
    {
        void Create(T t);
        void Update(T t);
        void Delete(T t);
        T Get(Expression<Func<T, bool>> predicate);
        IQueryable<T> GetAll();
        void SaveChanges();

    }
}