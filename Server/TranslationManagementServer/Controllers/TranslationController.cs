using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class TranslationController : ControllerBase
{
    private readonly TranslationBLL _translationBLL;

    public TranslationController(TranslationBLL translationBLL)
    {
        _translationBLL = translationBLL;
    }

    //Get All
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppModel>>> GetAllAppsAsync()
    {
        var apps = await _translationBLL.GetAllAppsAsync();
        return Ok(apps);
    }

    //Deploy
    [HttpPut("deploy/{id}")]
    public async Task<IActionResult> DeployApplicationAsync(string id, AppModel updatedApp)
    {
        if (id != updatedApp.Id?.ToString())
        {
            return BadRequest("ID mismatch between URL and payload.");
        }

        try
        {
            await _translationBLL.DeployApplicationAsync(id, updatedApp);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    //Update
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateApplicationAsync(string id, AppModel updatedApp)
    {
        if (id != updatedApp.Id?.ToString())
        {
            return BadRequest("ID mismatch between URL and payload.");
        }

        try
        {
            await _translationBLL.UpdateApplicationAsync(id, updatedApp);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // Create new application
    [HttpPost]
    public async Task<IActionResult> CreateApplicationAsync(AppModel newApp)
    {
        try
        {
            await _translationBLL.CreateApplicationAsync(newApp);
            var apps = await _translationBLL.GetAllAppsAsync();
            return Ok(apps);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }



}
