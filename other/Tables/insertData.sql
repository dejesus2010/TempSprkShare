INSERT INTO sparkusers values (1, 'ryan', '123', 'ryan@gmail.com', 'url/image.jpg', 'description', localtimestamp),
(2, 'eric', '123', 'eric@gmail.com', 'url/img.jpg','description', localtimestamp);

INSERT INTO sharequotas VALUES
( 1, 10, '2014-11-10', false ),
( 2, 13, '2014-09-12', false );

-- Postid, postuserid, posttitle, postcontent, postsharequotaid, postsharecount, posthasmedia, postdate
INSERT INTO posts VALUES (1, 1, 'Saving the World One Step At a Time',  'We will literally save the world by stepping over all cracks. Stepping on less cracks mean less moms breaking their backs', 1, 1, false, current_date ),
(2, 2, 'Creating a Sherlock Holmes Movie Based in year 3022', 'Sherlock Holmes is a classic of all classics, but the series has never seen a rendition of how the mad genius solves crimes where crimes are seen hours before they occur...', 2, 2, false, current_date );

-- contribid, contribpostid, contribuserid, contribcontent, contribhasmedia, contributeddate
INSERT INTO contributions VALUES
( 1, 1, 1, 'How the F$&% will not stepping on cracks save the F$&% world!?', false, current_date ),
( 2, 1, 2, 'The force of stepping on a crack is equivalent to 200 bees going 35 mph slamming into concrete at the same time, that will cause...', false, current_date),
( 3, 2, 2, 'Sherlock holmes will die by the time 30 w/e comes around', false, current_date );