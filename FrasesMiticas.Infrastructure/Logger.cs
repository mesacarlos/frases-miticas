using FrasesMiticas.Core.Interfaces;
using System;

namespace FrasesMiticas.Infrastructure
{
    public class Logger : ILogger
    {
        private readonly Serilog.ILogger logger;


        public Logger()
        {
            this.logger = Serilog.Log.Logger;
        }


        public void Verbose(string message) => logger.Verbose(message);
        public void Information(string message) => logger.Information(message);
        public void Debug(string message) => logger.Debug(message);
        public void Warning(string message) => logger.Warning(message);
        public void Error(string message) => logger.Error(message);
        public void Error(Exception ex) => logger.Fatal(ex, ex.Message);
        public void Error(string message, Exception ex) => logger.Error(ex, message);
        public void Fatal(string message) => logger.Fatal(message);
        public void Fatal(Exception ex) => logger.Fatal(ex, ex.Message);
        public void Fatal(string message, Exception ex) => logger.Fatal(ex, message);

    }
}
