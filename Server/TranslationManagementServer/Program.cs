using MongoDB.Driver; // Add this line


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSingleton(new MongoDbContext("mongodb://localhost:27017", "TranslationManagementDB"));
builder.Services.AddScoped<TranslationDAL>();
builder.Services.AddScoped<TranslationBLL>();
builder.Services.AddScoped<TranslationController>();
builder.Services.AddScoped<IMongoCollection<AppModel>>(provider =>
{
    var mongoDbContext = provider.GetRequiredService<MongoDbContext>();
    return mongoDbContext.Applications;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
