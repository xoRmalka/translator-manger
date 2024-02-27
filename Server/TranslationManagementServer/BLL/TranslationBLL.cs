using System.Text.Json;

public class TranslationBLL
{
    private readonly TranslationDAL _translationDAL;

    public TranslationBLL(TranslationDAL translationDAL)
    {
        _translationDAL = translationDAL;
    }

    //Get All
    public async Task<IEnumerable<AppModel>> GetAllAppsAsync()
    {
        return await _translationDAL.GetAllAppsAsync();
    }

    //Deploy
    public async Task DeployApplicationAsync(string id, AppModel updatedApp)
    {
        await _translationDAL.UpdateApplicationAsync(id, updatedApp);

        // Serialize updatedApp to JSON
        string json = JsonSerializer.Serialize(updatedApp.Translations);

        // Determine file path
        string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "translator");
        Directory.CreateDirectory(folderPath);
        string filePath = Path.Combine(folderPath, $"{updatedApp.AppName}.json");

        // Write JSON to file
        await File.WriteAllTextAsync(filePath, json);
    }

    // Create New App
    public async Task CreateApplicationAsync(AppModel newApp)
    {
        await _translationDAL.CreateApplicationAsync(newApp);
    }

    //Update
    public async Task UpdateApplicationAsync(string id, AppModel updatedApp)
    {
        await _translationDAL.UpdateApplicationAsync(id, updatedApp);

    }
}
