# Crafty

## Links of Note
- [Live Site](http://crafty-app.herokuapp.com/)
- [My LinkedIn](https://www.linkedin.com/in/jacob-grooms/)
- [My AngelList](https://angel.co/u/jacob-grooms)
- [My Github](https://github.com/j-grooms)

## Technologies Used

<img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/><img alt="CSS3" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/><img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/><img alt="Redux" src="https://img.shields.io/badge/redux%20-%23593d88.svg?&style=for-the-badge&logo=redux&logoColor=white"/>
<img alt="Flask" src="https://img.shields.io/badge/flask%20-%23000.svg?&style=for-the-badge&logo=flask&logoColor=white"/><img alt="AWS" src="https://img.shields.io/badge/AWS%20-%23FF9900.svg?&style=for-the-badge&logo=amazon-aws&logoColor=white"/><img alt="Heroku" src="https://img.shields.io/badge/heroku%20-%23430098.svg?&style=for-the-badge&logo=heroku&logoColor=white"/><img alt="Postgres" src ="https://img.shields.io/badge/postgres-%23316192.svg?&style=for-the-badge&logo=postgresql&logoColor=white"/><img alt="Docker" src="https://img.shields.io/badge/docker%20-%230db7ed.svg?&style=for-the-badge&logo=docker&logoColor=white"/>

## Postgres Schema
![Schema](https://github.com/j-grooms/Crafty/blob/master/server/design/Crafty_schema.jpg)

## About the Project

Crafty is an Etsy inspired storefront, developed solo as the capstone to the App Academy Curriculum. Throughout development, I still found myself going back to the basics of programming, as well as implemeting neat features using more complex frameworks like React and Redux. Going through the course was definitely a journey, and this project was no different. I feel that I learned a lot over the course of developing this project.

Users can sign up and give themselves some fake money to buy some fake products. You can also upload a profile picture, a banner for your profile page, and all products listed can have a photo to go along with it as well. After purchasing a product, users may review the item on it's respective page. Users may also edit any information they put in! This includes profile information, reviews, and any products that they own.

## Challenges Faced

A suprisingly difficult challenge was handling when to allow a user to review a product. There were 3 states to account for: not purchased, purchased but not reviewed, and reviewed. The following code allowed me to parse the information in the redux store, and return the appropriate elements.

```js
const reviewButtonLogic = () => {
	if (hasReviewed && hasPurchased) {
		return (
			<p className="rating-thank-you">
				Thanks for your review! You may edit it below
			</p>
		);
	} else if (hasPurchased) {
		return (
			<div className="product-view-review-button">
				<button className="login-button" onClick={() => setReviewing(true)}>
					Review Product
				</button>
			</div>
		);
	} else {
		return (
			<p className="rating-thank-you">
				Purchase this product and check out the review system!
			</p>
		);
	}
};
```

Another challenge was allowing a user to select a quantity, without letting them try and check out with more than what we have in stock. To solve this, I used a function to generate options based upon the quantity stored in the database.

```js
const generateOptions = (int) => {
	const options = [];
	for (let i = 1; i <= int; i++) {
		options.push(
			<option key={i} value={i}>
				{i}
			</option>
		);
	}
	return options;
};

// later on in the render method
<select name="quantity">
	{generateOptions(product.quantity).map((option) => option)}
</select>;
```

I later used a very similar approach to generating stars in the reviews.

Of course, challenges occured in the back end as well as the front end. SQLAlchemy was a joy to work with, however a self-referential many-to-many relationship had me stumped for a while. With a small tweak to what was in the official documentation, I was able to get it working!

```py
# in the User model
    followers = db.relationship('User',
                                secondary="followers",
                                primaryjoin=id == Follower.c.user_id,
                                secondaryjoin=id == Follower.c.follower,
                                )
    following = db.relationship('User',
                                secondary="followers",
                                primaryjoin=id == Follower.c.follower,
                                secondaryjoin=id == Follower.c.user_id,
                                )
```

A persistent bug that I kept running into with the Redux turned out to not be a bug, but expected behavior. I did not realize that it did not check for deep equality, so I had to move a lot of state out of nested objects, and into their own slices of state. The store is still not perfect, but I did do some expanding and refactoring, making it by far the biggest redux store I have made.

## The Future of Crafty
As always, no project ever truly feels complete. There is always code to refactor, and styling tweaks to be made. In the future, I plan to:
- Continue refactoring and trimming down the Redux store.
- Cut down on API calls, and place my dispatch calls in better locations.
- Continue styling (although I am starting to realize I am not a designer).
- Make the feed more interactive with carosels and different categories for price, almost sold out, etc.
