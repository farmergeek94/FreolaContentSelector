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
   - Add the project to your kentico xperience solution and reference from the main project.

3. **Register the Module**
   - The module is automatically registered via assembly attributes in `FreolaContentItemSelectorModule.cs`

4. **Add the plugin to a custom Editor Configuration**
   [rich-text-editor-configuration](https://docs.kentico.com/documentation/developers-and-admins/configuration/rich-text-editor-configuration#customize-the-editor)
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

## Frontend usage
  - Below is an example usage of querying the content items for display.
  - Note: example only, the controller is not provided.
  ````javascript
var disclaimerRepo = (function (containerId) {
    function repo(containerId) {
        var self = this;
        this.itemTemplate = function (idx, text) {
            return '<div class="disclaimer" style="display: flex">' + idx + '&nbsp;' + text + '</div>';
        }

        this.queryItems = function () {
            return document.querySelectorAll(`sup[data-type="Disclaimer.Type"]`);
        }

        this.queryByGuid = function (guid) {
            return document.querySelectorAll(`sup[data-type="Disclaimer.Type"][data-guid="${guid}"]`);
        }

        this.fetchGuids = function (guids) {
            return fetch("/disclaimer/get", {
                method: "POST",
                body: JSON.stringify(guids),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }).then(x => x.json());
        }

        this.run = function () {
            var guids = [];
            var items = self.queryItems();
            for (var item of items) {
                guids.push(item.getAttribute("data-guid"));
            }

            self.fetchGuids(guids).then(x => {
                var content = "";
                var idx = 1;
                for (var item of x) {
                    ;
                    var els = self.queryByGuid(item.guid);
                    for (var el of els) {
                        el.removeAttribute("data-guid")
                        el.removeAttribute("data-type")
                        el.innerHTML = idx;
                    }
                    content += self.itemTemplate(idx, item.text);
                    idx++;
                }

                var elem = document.getElementById("disclaimer-view");
                elem.innerHTML = content.replaceAll("~/", "/");
            });

            var manualDisclamers = true;
            //are both disclaimers empty
            var element = document.querySelector('#disclaimer-view-manual .blank-section');
            var html = element ? element.innerHTML : '';
            if (html.trim() === '') {
                // The manual div is empty
                manualDisclamers = false;
            }

            if (guids.length == 0) {

                if (manualDisclamers) {
                    var disclaimerContainer = document.getElementById("disclaimer-view");
                    disclaimerContainer.classList.add('d-none');
                }
                else {
                    var disclaimerContainer = document.getElementsByClassName("disclaimer-container");
                    disclaimerContainer[0].classList.add('d-none');
                }
            }            
        }

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", this.run);
        } else {
            this.run();
        }
    }
    return new repo(containerId);

})("disclaimer-view")
  ```` 
