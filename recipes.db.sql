CREATE TABLE Recipes (
    id INT PRIMARY KEY,
    category varchar(255),
    recipe_name varchar(511),
);

CREATE TABLE Ingredients (
    id INT PRIMARY KEY,
    ingredient_name varchar(255),
);

CREATE TABLE rec_ing (
    rec_id INT,
    ing_id INT,
    amount INT,
    measerument varchar(255),
    extra varchar(511)
);

CREATE TABLE Instructions (
    step INT,
    instruction TEXT,
    rec_id INT
)

/* TODO: Add primary keys */