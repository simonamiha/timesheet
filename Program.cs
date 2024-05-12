using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Timesheet;
using Timesheet.Data;
using Timesheet.Interfaces;
using Timesheet.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

//am adaugat asta pentru controllere si pentru swagger cele de jos
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.EnableAnnotations();
});

builder.Services.AddDbContext<EmployeeContext>();

//Add Identity
builder.Services.AddIdentity<Employee, IdentityRole>()
    .AddEntityFrameworkStores<EmployeeContext>()
    .AddDefaultTokenProviders();

builder.Services.AddScoped<IProcessStorage, ProcessStorage>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyPolicy",
        policy =>
        {
            policy.WithOrigins("*")
                .AllowAnyMethod().AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

// am adaugat asta pentru swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

//pt folosirea API din alta parte
app.UseCors("MyPolicy");

app.UseAuthorization();

//importanta maparea controllerelor
app.MapControllers();

app.MapRazorPages();

app.Run();
