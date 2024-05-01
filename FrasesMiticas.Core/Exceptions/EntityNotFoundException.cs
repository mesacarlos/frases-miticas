using System;

namespace FrasesMiticas.Core.Exceptions
{
    public class EntityNotFoundException : FrasesMiticasBaseException
    {
        public EntityNotFoundException(string message) : base(404, message)
        {

        }


        public EntityNotFoundException(object entityId, Type entityType) : this($"Entity of type \"{entityType.Name}\" and identifier \"{entityId}\" not found")
        {
        }
    }


    public class EntityNotFoundException<T> : EntityNotFoundException
    {
        public EntityNotFoundException(object entityId) : base(entityId, typeof(T))
        {
        }
    }
}
