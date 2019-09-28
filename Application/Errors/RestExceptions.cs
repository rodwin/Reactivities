using System;
using System.Net;

namespace Application.Errors
{
    public class RestExceptions : Exception
    {
        public RestExceptions(HttpStatusCode code, object errors = null )
        {
            Code = code;
            Errors = errors;
        }

        public HttpStatusCode Code { get; set; }
        public object Errors { get; set; }
    }
}