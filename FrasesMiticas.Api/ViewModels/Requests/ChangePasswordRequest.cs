namespace FrasesMiticas.Api.ViewModels.Requests
{
    public record ChangePasswordRequest(
        string Username,
        string OldPassword,
        string NewPassword);
}
