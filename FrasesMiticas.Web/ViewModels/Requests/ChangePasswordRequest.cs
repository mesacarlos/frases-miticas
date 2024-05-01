namespace FrasesMiticas.Web.ViewModels.Requests
{
    public record ChangePasswordRequest(
        string Username,
        string OldPassword,
        string NewPassword);
}
