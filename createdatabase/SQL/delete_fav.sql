########################
# This stored procedure deletes a users favorite beer from the database
#NOTE I should update this to validate params before storing
########################
drop procedure if exists delete_fav;
delimiter $$
create procedure delete_fav(IN beerid bigint, IN username varchar(25))
begin
DELETE FROM favoritebeers fb
where fb.beer_id = beerid
	AND fb.username = username;
end $$
delimiter ;