namespace restaurantWebAPI.Services
{
    public interface IAzureBlobStorageService
    {

        Task<string> UploadFileAsync(IFormFile file, string containerName);
        Task DeleteFileAsync(string blobName, string containerName);
    }
}
