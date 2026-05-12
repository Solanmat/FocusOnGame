using Microsoft.EntityFrameworkCore;
using FocusOnGame.Api.Data;
using FocusOnGame.Api.Services;

var builder = WebApplication.CreateBuilder(args);


// DATABASE
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));


// SERVICES
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<GameService>();
builder.Services.AddScoped<PathwayService>();

// CONTROLLERS
builder.Services.AddControllers();


// SWAGGER
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// CORS (React frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();


// SWAGGER
app.UseSwagger();
app.UseSwaggerUI();


// CORS
app.UseCors("AllowFrontend");


// CONTROLLERS
app.MapControllers();

app.Run();