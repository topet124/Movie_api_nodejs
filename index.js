const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

// allows Mongoose to connect to database myFlixDB
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(bodyParser.json());
app.use(morgan('common'));

let users = [{
    id: 1,
    name: "Nani",
    favouriteMovies: [],
  },
  {
    id: 2,
    name: "Prashanth",
    favouriteMovies: ["The Dark Knight"],
  },
];

let movies = [{
    Title: "The Shawshank Redemption",
    Description: "In 1947 Portland, Maine, banker Andy Dufresne is convicted of murdering his wife and her lover and is sentenced to two consecutive life sentences at the Shawshank State Prison. He is befriended by Ellis Red Redding, an inmate and prison contraband smuggler serving a life sentence. Red procures a rock hammer and a large poster of Rita Hayworth for Andy. Assigned to work in the prison laundry, Andy is frequently sexually assaulted by the Sisters and their leader, Bogs",
    Director: {
      Name: "Frank Darabont",
      Bio: "Frank Árpád Darabont (born Ferenc Árpád Darabont, January 28, 1959) is an American film director, screenwriter and producer. He has been nominated for three Academy Awards and a Golden Globe Award. In his early career, he was primarily a screenwriter for horror films such as A Nightmare on Elm Street 3: Dream Warriors (1987), The Blob (1988) and The Fly II (1989). As a director, he is known for his film adaptations of Stephen King novellas and novels such as The Shawshank Redemption (1994), The Green Mile (1999) and The Mist (2007)",
      Birth: "January 28, 1959",
    },
    Genre: {
      Name: "drama",
      Description: "In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone",
    },
  },
  {
    Title: "The God Father",
    Description: "In 1945 New York City, at his daughter Connie's wedding to Carlo, Vito Corleone, the Don of the Corleone crime family listens to requests. His youngest son, Michael, who was a Marine during World War II, introduces his girlfriend, Kay Adams, to his family at the reception. Johnny Fontane, a popular singer and Vito's godson, seeks Vito's help in securing a movie role; Vito dispatches his consigliere, Tom Hagen, to Los Angeles to persuade studio head Jack Woltz to give Johnny the part. Woltz refuses until he wakes up in bed with the severed head of his prized stallion.",
    Director: {
      Name: "Francis Ford Coppola",
      Bio: "Francis Ford Coppola  is an American film director, producer, and screenwriter. He was a central figure in the New Hollywood filmmaking movement of the 1960s and 1970s.[5] His accolades include five Academy Awards, six Golden Globe Awards, two Palmes d'Or, and a British Academy Film Award.",
      Birth: "April 7, 1939",
    },
    Genre: {
      Name: "crime films",
      Description: "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection. Stylistically, the genre may overlap and combine with many other genres, such as drama or gangster film,[1] but also include comedy, and, in turn, is divided into many sub-genres, such as mystery, suspense or noir.",
    },
  },
  {
    Title: "The Dark Knight",
    Description: "A gang of criminals rob a Gotham City mob bank; the Joker manipulates them into murdering each other for a higher share until only he remains, escaping with the money. Batman, District Attorney Harvey Dent and Lieutenant Jim Gordon form an alliance to rid Gotham of organized crime. Bruce Wayne is impressed with Dent's idealism and offers to support his career; he believes that, with Dent as Gotham's protector, he can give up being Batman and lead a normal life with Rachel Dawes—even though she and Dent are dating.",
    Director: {
      Name: "Christopher Nolan",
      Bio: " Christopher Edward Nolan is a British-American film director, producer, and screenwriter. His films have grossed more than US$5 billion worldwide, and have garnered 11 Academy Awards from 36 nominations. Born and raised in London, Nolan developed an interest in filmmaking from a young age. After studying English literature at University College London, he made his feature debut with Following (1998).",
      Birth: "July 30, 1970",
    },
    Genre: {
      Name: "superhero film",
      Description: "A superhero film (or superhero movie) is a film that focuses on the actions of superheroes",
    },
  },
  {
    Title: "The Lords of Rings",
    Description: "The prologue explains that the work is largely concerned with hobbits, telling of their origins in a migration from the east, their habits such as smoking pipe-weed, and of how their homeland the Shire is organised. It explains how the narrative follows on from The Hobbit, in which the hobbit Bilbo Baggins finds the One Ring, which had been in the possession of Gollum",
    Director: {
      Name: "Peter Jackson,",
      Bio: "Sir Peter Robert Jackson is a New Zealand film director, screenwriter, and film producer. He is best known as the director, writer, and producer of the Lord of the Rings trilogy (2001–03) and the Hobbit trilogy (2012–14), both of which are adapted from the novels of the same name by J. R. R. Tolkien. Other notable films include the critically lauded drama Heavenly Creatures (1994), the horror comedy The Frighteners (1996), the epic monster remake film King Kong (2005), and the World War I documentary film They Shall Not Grow Old (2018). He is the third-highest-grossing film director of all-time, his films having made over $6.5 billion worldwide.",
      Birth: "October 31, 1961",
    },
    Genre: {
      Name: " adventure film",
      Description: "An adventure film is form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films. Adventure films may also be combined with other film genres such as action, animation, comedy, drama, fantasy, science fiction, family, horror, or war.",
    },
  },
  {
    Title: "The Matrix",
    Description: "Picking up immediately where Reloaded ended, Neo and Bane still lie unconscious in the medical bay of the ship Hammer. Inside the Matrix, Neo is trapped in a subway station named Mobil Ave, a transition zone between the Matrix and the machine world. He meets a family of programs, including a girl named Sati. The father tells Neo the subway is controlled by the Trainman, a program loyal to the Merovingian. When Neo tries to board a train with the family, the Trainman refuses and overpowers him.",
    Director: {
      Name: "Lana Wachowski",
      Bio: "Lana Wachowski (born June 21, 1965, formerly known as Larry Wachowski) and Lilly Wachowski (born December 29, 1967, formerly known as Andy Wachowski) are American film and television directors, writers and producers. The sisters are both trans women. Collectively known as the Wachowskis, the sisters have worked as a writing and directing team through most of their careers. They made their directing debut in 1996 with Bound, and achieved fame with their second film The Matrix (1999), a major box office success for which they won the Saturn Award for Best Director. They wrote and directed its two sequels, The Matrix Reloaded and The Matrix Revolutions (both in 2003), and were involved in the writing and production of other works in the Matrix franchise.",
      Birth: "June 21, 1965",
    },
    Genre: {
      Name: "Science fiction",
      Description: "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition.",
    },
  },
  {
    Title: "Star Wars",
    Description: "During the first year of the Clone Wars, Jedi Knight Anakin Skywalker and his master, Obi-Wan Kenobi, lead a small battalion of Republic Clone troopers against Count Dooku's Separatist droid army on the planet Christophsis. Awaiting reinforcements, the two Jedi greet a shuttle carrying a young Jedi Padawan named Ahsoka Tano, who insists that she has been assigned by Grandmaster Yoda to serve as Anakin's apprentice instead of Obi-Wan's, as initially believed. Anakin reluctantly accepts Ahsoka as his apprentice and the two succeed in deactivating the Separatists' energy field while Obi-Wan stalls the droid army commander, allowing a Republic victory. Ahsoka earns Anakin's respect.",
    Director: {
      Name: "David Filon",
      Bio: "David Filoni (born June 7, 1974) is an American film and television director, voice actor, television writer, television producer, and animator. He has worked on Avatar: The Last Airbender, The Mandalorian, and on the theatrical film and television series of Star Wars: The Clone Wars. He was also the creator and an executive producer on Star Wars Rebels for all four seasons, and served as its supervising director for all but the third season, in which Justin Ridge served as supervising director while Filoni accepted a promotion to oversee all of Lucasfilm Animation projects.[2] Filoni is also credited as one of the writers and executive producers of the web series Star Wars Forces of Destiny, and as the creator of the 2018–2020 animated series Star Wars Resistance and the 2021 animated series Star Wars: The Bad Batch.",
      Birth: "June 7, 1974",
    },
    Genre: {
      Name: "Epic",
      Description: "Epic films are a style of filmmaking with large scale, sweeping scope, and spectacle. The usage of the term has shifted over time, sometimes designating a film genre and at other times simply synonymous with big-budget filmmaking. Like epics in the classical literary sense it is often focused on a heroic character. An epic's ambitious nature helps to set it apart from other types of film such as the period piece or adventure film.",
    },
  },
  {
    Title: "Goodfellas",
    Description: "In 1955, a young Henry Hill becomes enamored of the criminal life and Mafia presence in his working class Italian-American neighborhood in Brooklyn. He begins working for local caporegime Paul Paulie Cicero and his associates: James Jimmy Conway, an Irish-American truck hijacker and gangster, and Tommy DeVito, a fellow juvenile delinquent. Henry begins as a fence for Jimmy, gradually working his way up to more serious crimes. The three associates spend most of their nights in the 1960s at the Copacabana nightclub carousing with women. Henry starts dating Karen Friedman, a Jewish woman who is initially troubled by Henry's criminal activities. She is eventually seduced by Henry's glamorous lifestyle, and marries him despite her parents' disapproval.",
    Director: {
      Name: "Martin Charles Scorsese",
      Bio: "Martin Charles Scorsese s an American film and television director, producer, screenwriter, and film historian, in addition to occasionally serving as an actor. One of the major figures of the New Hollywood era, he is widely regarded as one of the greatest and most influential directors in film history.",
      Birth: "November 17, 1942",
    },
    Genre: {
      Name: "Crime films",
      Description: "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection. Stylistically, the genre may overlap and combine with many other genres, such as drama or gangster film,[1] but also include comedy, and, in turn, is divided into many sub-genres, such as mystery, suspense or noir.",
    },
  },
  {
    Title: "Alien",
    Description: "The commercial space tug Nostromo is returning to Earth with a seven-member crew in stasis: Captain Dallas, Executive Officer Kane, Warrant Officer Ripley, Navigator Lambert, Science Officer Ash, and two engineers, Parker and Brett. Detecting a transmission from a nearby moon, the ship's computer, Mother, awakens the crew. Per company policy requiring any potential distress signal be investigated, they land on the moon despite Parker's protests, sustaining damage from its atmosphere and rocky landscape in the process. The engineers stay on board to effect repairs while Dallas, Kane, and Lambert head out to investigate. They discover the signal originates from a derelict alien ship and enter it, losing communication with the Nostromo. Ripley deciphers part of the transmission, determining it to be a warning, but cannot relay this information to those on the derelict ship.",
    Director: {
      Name: "Sir Ridley Scott",
      Bio: "Sir Ridley Scott  is an English film director and producer. He has directed, among others, the science fiction horror film Alien (1979), the neo-noir dystopian film Blade Runner (1982), the road adventure film Thelma & Louise (1991), the historical drama film Gladiator (2000), the war film Black Hawk Down (2001), and the science fiction film The Martian (2015).",
      Birth: "30 November 1937",
    },
    Genre: {
      Name: "Science fiction",
      Description: "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition.",
    },
  },
  {
    Title: "Joker",
    Description: "Party clown and aspiring stand-up comedian Arthur Fleck lives with his mother, Penny, in Gotham City, which is rife with crime and unemployment. Arthur suffers from a neurological disorder that causes him to laugh at inappropriate times, depending on social services for medication. After being attacked by delinquents, Arthur's co-worker Randall gives him a gun for self-defense. Arthur pursues a relationship with his neighbor, single mother Sophie Dumond, and invites her to his upcoming stand-up routine at a nightclub.",
    Director: {
      Name: "Todd Phillips",
      Bio: "Todd Phillips is an American filmmaker and occasional actor. Phillips began his career in 1993 and directed films in the 2000s such as Road Trip, Old School, Starsky & Hutch, and School for Scoundrels. He came to prominence in the early 2010s for directing The Hangover film series. In 2019, he co-wrote and directed the psychological thriller film Joker, based on the DC Comics character of the same name, which premiered at the 76th Venice International Film Festival where it received the top prize, the Golden Lion. Joker went on to earn Phillips three Academy Award nominations for Best Picture, Best Director, and Best Adapted Screenplay, with his co-writer Scott Silver.",
      Birth: "December 20, 1970",
    },
    Genre: {
      Name: "Psychological thriller",
      Description: "Psychological thriller is a genre combining the thriller and psychological fiction genres. It is commonly used to describe literature or films that deal with psychological narratives in a thriller or thrilling setting.",
    },
  },
  {
    Title: "Tenet",
    Description: "Tenet is a 2020 science fiction action thriller film written and directed by Christopher Nolan, who produced it with Emma Thomas. A co-production between the United Kingdom and the United States, it stars John David Washington, Robert Pattinson, Elizabeth Debicki, Dimple Kapadia, Michael Caine, and Kenneth Branagh. The film follows a secret agent who learns to manipulate the flow of time to prevent an attack from the future that threatens to annihilate the present world.",
    Director: {
      Name: "Christopher Nolan",
      Bio: " Christopher Edward Nolan is a British-American film director, producer, and screenwriter. His films have grossed more than US$5 billion worldwide, and have garnered 11 Academy Awards from 36 nominations. Born and raised in London, Nolan developed an interest in filmmaking from a young age. After studying English literature at University College London, he made his feature debut with Following (1998).",
      Birth: "July 30, 1970",
    },
    Genre: {
      Name: "Action film",
      Description: "Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases. Action films tend to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero. Advancements in computer-generated imagery (CGI) have made it cheaper and easier to create action sequences and other visual effects that required the efforts of professional stunt crews in the past.",
    },
  },
];

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

app.get("/movies", (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


//getting files using static
app.use(express.static('public'));



// Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a movie by username
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a genre by name
app.get('/genre/:Name', (req, res) => {
  Movies.findOne({'Genre.Name': req.params.Name})
    .then((movies) => {
      res.json(movies.Genre.Description);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// Get a director by name
app.get('/director/:Name', (req, res) => {
  Movies.findOne({'Director.Name': req.params.Name})
    .then((movies) => {
      res.json(movies.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});




// create a user's info
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});


// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Allow users to update their movie list
app.put("/users/:id/favoritemovies/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favouriteMovies.push(movieTitle);
    res.status(200).send(movieTitle + " was added to your list of favourites");
  } else {
    res.status(400).send("no such user");
  }
});

//Allow users to change their info
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//Allow users to add movie from their list of favorites

app.put('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});


//Allow users to remove movie from their list of favorites

app.delete('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $pull: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});




//Allow users to deregister from the list by username

// Delete a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
