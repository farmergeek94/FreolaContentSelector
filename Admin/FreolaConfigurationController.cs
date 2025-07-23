using CMS.ContentEngine;
using Kentico.Membership;
using Kentico.Xperience.Admin.Base;
using Kentico.Xperience.Admin.Base.UIPages;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using static HotChocolate.ErrorCodes;

namespace FreolaContentSelector.Admin
{
    public class FreolaConfigurationController(IContentQueryExecutor contentQueryExecutor) : Controller
    {
        [HttpGet]
        [Authorize(AuthenticationSchemes = $"{AdminIdentityConstants.APPLICATION_SCHEME}, {AdminIdentityConstants.EXTERNAL_SCHEME}")]
        public async Task<IActionResult> GetContentItems(string contentType, string search, string searchColumn)
        {
            var builder = new ContentItemQueryBuilder().
                ForContentType(contentType)
                .Parameters(p=> {
                    var par = p.TopN(20);
                    if (!string.IsNullOrWhiteSpace(search))
                    {
                        par = par.Where(x => x.WhereLike(searchColumn, $"%{search}%"));
                    }
                });
            var items = await contentQueryExecutor.GetResult(builder, x => new ContentItemModel
            {
                ContentItemName = x.GetValue<string>(searchColumn),
                ContentItemGUID = x.ContentItemGUID.ToString(),
            });
            return Json(items);
        }
        private class ContentItemModel
        {
            public string ContentItemName { get; set; }
            public string ContentItemGUID { get; set; }
        }

    }
}
