/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    //RSS Feeds Test
    describe('RSS Feeds', function() {

        //All feeds are defined, not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //All feeds have URL that starts with "http(s)://"
        function checkValidURLs(feed) {
            it('feed fave valid URL', function() {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBeLessThan(9);
                expect(feed.url).toMatch(/^http(s?)\:\/\//);
            });
        }

        for (var i = 0; i < allFeeds.length; i++) {
            checkValidURLs(allFeeds[i]);
        }


        //All feeds have names and not empty
        it('has names', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
                expect(typeof allFeeds[i].name).toBe('string');
            }
        });

    });



    //The menu testing
    describe('The menu', function() {

        // Pre-define elements needed for testing hiding/showing of the menu
        var body = document.body;
        var menuIcon = document.querySelector('.menu-icon-link');

        //menu is hidden initially
        it('body has menu-hidden initially', function() {
            expect(body.className).toContain('menu-hidden');
        });

        //menu icon toggles hide/show on clicking
        it('body toggles the class menu-hidden on clicking menu icon', function() {
            menuIcon.click();
            expect(body.className).not.toContain('menu-hidden');

            menuIcon.click();
            expect(body.className).toContain('menu-hidden');
        });
    });



    //Initial Entires Testing
    describe('Initial Entires', function() {

        //Avoid duplicated setup
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        //should at least 1 .entry element in the /feed container
        it('there is at least a single .entry element within the .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });



    //New Feed Selection Testing 
    describe('New Feed Selection', function() {
        var defaultContent;
        var updatedContent;

        //Avoid duplicated setup
        beforeEach(function(done) {
            loadFeed(0, function() {
                defaultContent = $('.feed').text();

                loadFeed(1, function() {
                    updatedContent = $('.feed').text();
                    done();
                });
            });
        });

        //When new feed is loaded using loadFeed function the content changes
        it('loads a new feed', function() {
            expect(updatedContent).not.toBe(defaultContent);
        });
    });
}());