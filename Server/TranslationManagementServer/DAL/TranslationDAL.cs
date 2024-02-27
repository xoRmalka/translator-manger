using MongoDB.Driver;
using MongoDB.Bson;

public class TranslationDAL
{
    private readonly IMongoCollection<AppModel> _applications;

    public TranslationDAL(IMongoCollection<AppModel> applications)
    {
        _applications = applications;
    }

    //Get All
    public async Task<IEnumerable<AppModel>> GetAllAppsAsync()
    {
        return await _applications.Find(_ => true).ToListAsync();
    }

    //Deploy Or Update
    public async Task UpdateApplicationAsync(string id, AppModel updatedApp)
    {
        var filter = Builders<AppModel>.Filter.Eq("_id", ObjectId.Parse(id));
        var updateResult = await _applications.ReplaceOneAsync(filter, updatedApp);
    }

    // Create new application
    public async Task CreateApplicationAsync(AppModel newApp)
    {
        await _applications.InsertOneAsync(newApp);
    }
}
