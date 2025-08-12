########################
# This stored procedure deletes a review from the database. 
#NOTE I should update this to validate params before storing
########################
drop procedure if exists delete_review;
delimiter $$
create procedure delete_review(IN reviewID bigint)
begin
DELETE FROM reviews
where reviews.review_id = reviewID;
end $$
delimiter ;