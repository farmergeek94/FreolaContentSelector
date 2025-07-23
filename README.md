# Freola Content Item Selector

This project is a Kentico Xperience Admin UI module that adds a custom application category and client module for selecting content items. It is designed to extend the admin interface with a new pane for content item selection.

## Features
- Registers a new application category in the Kentico Xperience Admin UI
- Provides a client-side React component for content item selection
- Modular structure for easy integration and maintenance

## Project Structure
- `FreolaContentItemSelectorModule.cs`: Main module class, registers the admin module and client module
- `Admin/FreolaConfigurationController.cs`: (Controller for admin content item selection)
- `Client/`: Contains the React client application
  - `src/entry.tsx`: Entry point for the client app
  - `src/FreolaContentItemSelector/`: Content item selector pane and components
- `FreolaContentSelector.csproj`: Project file

## Getting Started
1. **Build the Project**
   - Open the solution in Visual Studio
   - Build the project to generate the DLLs

2. **Add to Kentico Xperience**
   - Add the project to your kentico xperince solution and reference from the main project.

3. **Register the Module**
   - The module is automatically registered via assembly attributes in `FreolaContentItemSelectorModule.cs`

4. **Add the plugin to a custom Editor Configuration**
   (rich-text-editor-configuration)[https://docs.kentico.com/documentation/developers-and-admins/configuration/rich-text-editor-configuration#customize-the-editor]
   ````json
        {
            "pluginName": "@freola/content-item-selector/FreolaContentItemSelector",
            "pluginOptions": {
                "contentType": "Disclaimer.Type",
                "searchColumn": "DisclaimerText",
                "name": "Disclaimers"
            }
        }
   ````

## Development
- **Client App**: The client-side code is written in TypeScript and React. Use `npm install` and `npm run build` in the `Client` folder to build the frontend assets.
- **Backend**: The backend is a .NET 8 class library. Use Visual Studio or `dotnet build` to compile.

## Customization
- Update the React components in `Client/src/FreolaContentItemSelector/` to change the UI or selection logic.
- Modify `FreolaContentItemSelectorModule.cs` to adjust module registration or initialization logic.

