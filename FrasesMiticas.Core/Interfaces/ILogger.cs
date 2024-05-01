using System;

namespace FrasesMiticas.Core.Interfaces
{
    public interface ILogger
    {
        /// <summary>
        /// Logs a message of type "Verbose"
        /// </summary>
        /// <param name="message">Message to log</param>
        public void Verbose(string message);


        /// <summary>
        /// Logs a message of type "Information"
        /// </summary>
        /// <param name="message">Message to log</param>
        public void Information(string message);


        /// <summary>
        /// Logs a message of type "Debug"
        /// </summary>
        /// <param name="message">Message to log</param>
        public void Debug(string message);


        /// <summary>
        /// Logs a message of type "Warning"
        /// </summary>
        /// <param name="message">Message to log</param>
        public void Warning(string message);


        /// <summary>
        /// Logs a message of type "Error"
        /// </summary>
        /// <param name="message">Message to log</param>
        public void Error(string message);


        /// <summary>
        /// Logs an exception
        /// </summary>
        /// <param name="exception">Exception to log</param>
        public void Error(Exception exception);


        /// <summary>
        /// Logs a message of type "Error" with an exception
        /// </summary>
        /// <param name="message">Message to log</param>
        /// <param name="exception">Related exception</param>
        public void Error(string message, Exception exception);


        /// <summary>
        /// Logs a message of type "Fatal"
        /// </summary>
        /// <param name="message">Message to log</param>
        public void Fatal(string message);


        /// <summary>
        /// Logs an exception
        /// </summary>
        /// <param name="exception">Exception to log</param>
        public void Fatal(Exception exception);


        /// <summary>
        /// Logs a message of type "Fatal" with an exception
        /// </summary>
        /// <param name="message">Message to log</param>
        /// <param name="exception">Related exception</param>
        public void Fatal(string message, Exception exception);
    }
}
