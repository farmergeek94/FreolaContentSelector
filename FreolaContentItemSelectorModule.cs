using Kentico.Xperience.Admin.Base;
using FreolaContentSelector;

[assembly: CMS.AssemblyDiscoverable]
[assembly: CMS.RegisterModule(typeof(FreolaContentItemSelectorModule))]

// Adds a new application category 
[assembly: UICategory(FreolaContentItemSelectorModule.CUSTOM_CATEGORY, "Freola ContentItemSelctor", Icons.SchemeConnectedCircles, 100)]

namespace FreolaContentSelector
{
    internal class FreolaContentItemSelectorModule : AdminModule
    {
        public const string CUSTOM_CATEGORY = "freola-content-item-selector.category";

        public FreolaContentItemSelectorModule()
            : base("Freola.ContentItemSelctor")
        {
        }

        protected override void OnInit()
        {
            base.OnInit();

            // Makes the module accessible to the admin UI
            RegisterClientModule("freola", "content-item-selector");
        }
    }
}
