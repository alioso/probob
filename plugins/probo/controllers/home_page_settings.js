/*
    Copyright (C) 2015  PencilBlue, LLC

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

module.exports = function HomePageSettingsModule(pb) {

    //pb dependencies
    var util          = pb.util;
    var PluginService = pb.PluginService;

    /**
     * Settings for the display of home page content in the Probo theme
     * @class HomePageSettings
     * @author Blake Callens <blake@pencilblue.org>
     */
    function HomePageSettings() {}
    util.inherits(HomePageSettings, pb.BaseController);

    HomePageSettings.prototype.render = function(cb) {
        var self = this;

        var content = {
            content_type: "text/html",
            code: 200
        };

        var tabs = [
            {
                active: 'active',
                href: '#home_layout',
                icon: 'home',
                title: self.ls.get('HOME_LAYOUT')
            },
            {
                href: '#media',
                icon: 'picture-o',
                title: self.ls.get('HOME_MEDIA')
            },
            {
                href: '#callouts',
                icon: 'th',
                title: self.ls.get('CALLOUTS')
            }
        ];

        var pills = [
        {
            name: 'content_settings',
            title: self.ls.get('HOME_PAGE_SETTINGS'),
            icon: 'chevron-left',
            href: '/admin/plugins/probo/settings'
        }];

        var opts = {
            where: {settings_type: 'home_page'}
        };
        var dao  = new pb.DAO();
        dao.q('probo_theme_settings', opts, function(err, homePageSettings) {
            if(homePageSettings.length > 0) {
                homePageSettings = homePageSettings[0];
            }
            else {
                homePageSettings = {callouts: [{}, {}, {}, {}]};
            }

            var mservice = new pb.MediaService();
            mservice.get(function(err, media) {
                if(homePageSettings.page_media) {
                    var pageMedia = [];
                    for(i = 0; i < homePageSettings.page_media.length; i++) {
                        for(j = 0; j < media.length; j++) {
                            if(pb.DAO.areIdsEqual(media[j][pb.DAO.getIdField()], homePageSettings.page_media[i])) {
                                pageMedia.push(media[j]);
                                media.splice(j, 1);
                                break;
                            }
                        }
                    }
                    homePageSettings.page_media = pageMedia;
                }

                var objects = {
                    navigation: pb.AdminNavigation.get(self.session, ['plugins', 'manage'], self.ls),
                    pills: pills,
                    tabs: tabs,
                    media: media,
                    homePageSettings: homePageSettings
                };

                self.ts.registerLocal('angular_script', '');
                self.ts.registerLocal('angular_objects', new pb.TemplateValue(pb.ClientJs.getAngularObjects(objects), false));
                self.ts.load('admin/settings/home_page_settings', function(err, result) {
                    cb({content: result});
                });
            });
        });
    };

    HomePageSettings.getRoutes = function(cb) {
        var routes = [
            {
                method: 'get',
                path: '/admin/plugins/probo/settings/home_page',
                auth_required: true,
                access_level: pb.SecurityService.ACCESS_EDITOR,
                content_type: 'text/html'
            }
        ];
        cb(null, routes);
    };

    //exports
    return HomePageSettings;
};
