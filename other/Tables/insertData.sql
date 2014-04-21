
INSERT INTO sparkusers values (1, 'Ryan DeJesus', '123', 'ryan@gmail.com', 'https://scontent-b-dfw.xx.fbcdn.net/hphotos-prn2/t1.0-9/10154207_296914857132950_7315419339655607773_n.jpg', 'I like to wear suits for no reason.', localtimestamp),
(2, 'Eric Gross', '123', 'eric@gmail.com', 'https://scontent-a-dfw.xx.fbcdn.net/hphotos-ash2/t1.0-9/579979_4237987877773_1852583077_n.jpg','Rocks. How wonderful they are.', localtimestamp),
(3, 'Jorge Paez', '123', 'jorge@gmail.com', 'https://scontent-b-dfw.xx.fbcdn.net/hphotos-ash3/t1.0-9/1010287_10152984089815451_1861712169_n.jpg','I like legos.', localtimestamp),
(4, 'Aleksey Klintsevich', '123', 'aleksey@gmail.com','https://scontent-b-dfw.xx.fbcdn.net/hphotos-prn2/t1.0-9/2588_59919131555_2256495_n.jpg', 'All I need is grass, paper, and pencil, and I''m set. Happy happy happy.', localtimestamp ),
(5, 'Daniel Rincon','123', 'daniel@gmail.com', 'https://scontent-b-dfw.xx.fbcdn.net/hphotos-prn1/t1.0-9/61138_162582587199143_916031202_n.jpg', 'Some funny description here...', localtimestamp),
(6, 'Andrew Kerr','hello', 'akerr@gmail.com', 'https://lh4.googleusercontent.com/-yMNueQHYz3Y/AAAAAAAAAAI/AAAAAAAAB-k/rQVl5hgOBJ8/photo.jpg', 'Power to the processor!', localtimestamp),
(7, 'Lebron Jamessss','hello', 'lbron@gmail.com', 'http://www.totalprosports.com/wp-content/uploads/2013/03/lebron-james-thumbs-up-miami.jpg', 'I gotchu, bro!', localtimestamp);


INSERT INTO sharequotas VALUES
( 1, 10, '2014-11-10', false ),
( 2, 13, '2014-09-12', false ),
( 3, 7, '2014-05-01', false ),
( 4, 9, '2014-05-05', false ),
( 5, 25, '2014-04-21', false );

-- Postid, postuserid, posttitle, postcontent, postsharequotaid, postsharecount, posthasmedia, postdate
INSERT INTO posts VALUES (1, 1, 'Saving the World One Step At a Time',  'We will literally save the world by stepping over all cracks. Stepping on less cracks mean less moms breaking their backs', 1, 1, false, current_date ),
(2, 2, 'Creating a Sherlock Holmes Movie Based in year 3022', 'Sherlock Holmes is a classic of all classics, but the series has never seen a rendition of how the mad genius solves crimes where crimes are seen hours before they occur...', 2, 2, false, current_date ),
(3, 3, 'War of Lego Land', 'The movie''s setting takes place in Legolace. I need help with designing the graphics and making stuff look bad a$%!!', 1, 2, false, current_date ),
(4, 4, 'The Sun Must DIE', 'Sun death ray to destroy the universe', 1, 2, false, current_date ),
(5, 2, 'All in Moderation, Even Moderation', 'A recursive definition!', 1, 2, false, current_date ),
(6, 3, 'Built my First Konnect Rollercoaster!', 'Rollercoaster Tycoon ain''t got nothing on this!', 1, 2, false, current_date ),
(7, 1, 'Today We Spent an All-nighter', 'Working on this project', 1, 2, false, current_date );

-- contribid, contribpostid, contribuserid, contribcontent, contribhasmedia, contributeddate
--INSERT INTO contributions VALUES
--( 1, 1, 1, 'How the F$&% will not stepping on cracks save the F$&% world!?', false, current_date ),
--( 2, 1, 2, 'The force of stepping on a crack is equivalent to 200 bees going 35 mph slamming into concrete at the same time, that will cause...', false, current_date),
--( 3, 2, 2, 'Sherlock holmes will die by the time 30 w/e comes around', false, current_date );