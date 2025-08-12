########################
# This stored procedure inserts a user review into the database
#NOTE I should update this to validate params before storing
########################
drop procedure if exists insert_review;
delimiter $$
create procedure insert_review(IN username varchar(25), IN beer_id bigint, IN review_date datetime, in overall_score int, in palette_score int, in aroma_score int, in appearance_score int, in taste_score int)
begin
insert into reviews ( username, beer_id, review_date, overall_score, palette_score, aroma_score, appearance_score, taste_score)
values (username, beer_id, review_date, overall_score, palette_score, aroma_score, appearance_score, taste_score);
end $$
delimiter ;