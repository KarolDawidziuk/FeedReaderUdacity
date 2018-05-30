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

        it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('toggles visibility on click', function() {
            // show menu
            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // hide menu 
            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    //Initial Entires Testing
    describe("Initial Entries", function() {

        // Avoid duplicated setup
        // Before loading feed
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // Load "loadFeed" function is called and completes it, and there
        // should at least 1 .entry element in the .feed contianer
        it("has at least 1 entry after loadFeed function is called", function(done) {
            var numEntries = document.querySelector(".feed").getElementsByClassName("entry").length;
            expect(numEntries).toBeGreaterThan(0);
            done();
        });

        // Make sure each (.feed .entry-link) element has valid link
        it("has a entry that has a link starting with 'http(s)://'", function(done) {
            var entries = document.querySelector(".feed").getElementsByClassName("entry-link");
            for (var i = 0; i < entries.length; i++) {
                expect(entries[i].href).toMatch(/^(http|https):\/\//);
            }
            done();
        });
    });


    //New Feed Selection Testing 
    describe("New Feed Selection", function() {

        // Avoid duplicated setup
        // Initial loaded feed setup
        var initFeedSelection;
        beforeEach(function(done) {
            loadFeed(0, function() {
                initFeedSelection = document.querySelector(".feed").innerHTML;

                loadFeed(1, function() {
                    done();
                });
            });
        });

        // Make sure when new feed is loaded using loadFeed function,
        // the content changes
        it("changes its loaded content", function(done) {
            var newFeedSelection = document.querySelector(".feed").innerHTML;
            expect(initFeedSelection).not.toBe(newFeedSelection);
            done();
        });
    });
}());