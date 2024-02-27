using MongoDB.Bson;
using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

public class AppModel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string AppName { get; set; } = string.Empty;
    public DateTime LastDeploymentDate { get; set; }
    public List<Translation> Translations { get; set; } = new List<Translation>();
}

public class Translation
{
    public string? Key { get; set; }
    public string? en { get; set; }
    public string? fr { get; set; }
    public string? du { get; set; }
}
