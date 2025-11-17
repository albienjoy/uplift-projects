const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App {
  constructor(appName) {
    this.appName = appName;
    this.treasureItems = [
      //here I will list the items they can get from the woman
      { weapon: "Axe", clothing: "Cape" },
      { weapon: "Bow and arrows", clothing: "Long skirt" },
      { weapon: "Small knife", clothing: "Riding boots" },
    ];
    this.treasureItemsDuplicate = [...this.treasureItems]; 
  }

  mainPage() {
    const page = `

${this.appName}
Created by: Albien Sis♡n
Uplift Batch 28 - M♡mentum

        ⋆｡ﾟ☁︎｡⋆✧˖°.⋆｡𖦹°⭒˚｡⋆
---------------------------------------
          THE BEGINNING
---------------------------------------
        ⋆｡ﾟ☁︎｡⋆⋆｡𖦹°⭒˚｡⋆⋆｡ﾟ☁︎｡⋆

[1] Start adventure     
[2] Go back to the real world
[3] Luck check (Demo)
[4] Add item (Demo)
[5] Steal item (Demo)
[6] Check inventory (Demo)
    `;

    console.log(page);

    rl.question("Choose action: ", (answer) => {
      switch (answer) {
        case "1":
          console.clear();
          this.luckCheck();
          break;

        case "2":
          console.log("Thank you for playing. See you again soon!");
          rl.close();
          break;

                case "3":
          console.clear();
          this.luckCheck();
          break;

                  case "4":
          console.clear();
          this.giveMorePage();
          break;
                  case "5":
          console.clear();
          this.womanRequestPage();
          break;
                  case "6":
          console.clear();
          this.itemCheckPage();
          break;


        default:
          console.clear();
          console.log("Invalid Option");
          this.mainPage();
      }
    });
  }

  luckCheck() {
    const page = `

⚀⚁⚂⚃⚄
Let's test your luck before you start.
Give a number from 5-10.

`;

    console.log(page);

    rl.question("Give a number: ", (max) => {
        if (max <= 10 && max >= 5){
      let luckCheck = getRandomNumber(1, max); //calls the fxn i made at the top
      console.log(`
You rolled a ${luckCheck}! 
            `);
                    }else{
        console.clear();
        console.log("⚠️ Choose a number from 5-10 only.");
        this.luckCheck();
        }

      console.log(`
[1] Start my adventure      [2] Try again!       [3] Back to the main page
            `);

      rl.question("What do you want to do? ", (answer) => {
        switch (answer) {
          case "1":
            console.clear();
            if (luckCheck <= 5) {
              //directs the player to different starting pages depending on the number they rolled
              this.badLuck();
            }
            if (luckCheck >= 5) {
              this.goodLuck();
            }
            break;

          case "2":
            console.clear();
            console.log("Let's see if your luck improves.");
            this.luckCheck();
            break;

                      case "3":
            console.clear();
            this.mainPage();
            break;

          default:
            console.clear();
            console.log("Can't do that!");
            this.luckCheck();
        }
      });
    });
  }

  goodLuck() {
    //1
    const page = `

                              ❀*ੈ⋆𖣂⋆*ੈ❀
You are an adventurer trying to learn all the languages of your world.
You are looking for the scroll containing the first language,
and your journey has led you to a big mystical tree. 

A few meters in front, you see a woman in a gray cloak. 
Behind you is a ladder going up a treehouse. 

What do you do?
    
[1] Talk to the woman      [2] Go up the treehouse     [3] Back to main page
    `;

    console.log(page);

    rl.question("Choose action: ", (answer) => {
      switch (answer) {
        case "1":
          console.clear();
          this.womanPage();
          break;

        case "2":
          console.clear();
          this.treehousePage();
          break;

        case "3":
          console.clear();
          this.mainPage();
          break;

        default:
          console.clear();
          console.log("Oops! Can't do that.");
          this.goodLuck();
      }
    });
  }

  badLuck() {
    //1
    const page = `

To proceed, you have to type the following word perfectly:
                    "polymorphism"
    
    `;

    console.log(page);

    rl.question("Type it: ", (input) => {
      console.log(`
[1] Submit my answer     [2] Check my luck again.     
[3] Type it again.       [4] Escape to the main page!
    `);

      rl.question("Choose action: ", (answer) => {
        switch (answer) {
          case "1":
            if (input == "polymorphism") {
              console.clear();
              this.goodLuck();
            } else {
              console.clear();
              console.log("Oops, wrong! Try again!");
              this.badLuck();
            }
            break;

          case "2":
            console.clear();
            this.luckCheck();
            break;

          case "3":
            console.clear();
            console.log("Type more carefully this time!");
            this.badLuck();
            break;

          case "4":
            console.clear();
            this.mainPage();
            break;

          default:
            console.clear();
            console.log("Oops! Can't do that.");
            this.badLuck();
        }
      });
    });
  }

  womanPage() {
    const page = `

The woman waits for you to approach. She looks kind.
She turns to you and asks, "If you give me something from your pack,
something good will happen to you."
    
[1] Sure, why not?      [2] No, I don't want to.     [3] Escape. Begin again!
    `;

    console.log(page);

    rl.question("Choose action: ", (answer) => {
      switch (answer) {
        case "1":
          console.clear();
          this.womanRequestPage();
          break;

        case "2":
          console.clear();
          this.consequencePage();
          break;

        case "3":
          console.clear();
          this.mainPage();
          break;

        default:
          console.clear();
          console.log("Oops! Can't do that.");
          this.womanPage();
      }
    });
  }

  womanRequestPage() { 
    const page = `

She shows you what she already has below.
You look at your rucksack and see that you are fully armed:
swords, shields, helmets, and many more.
`
    console.log(page);
    console.table(this.treasureItems);

    console.log(`
[1] Give something       [2] Say no.
[3] Steal from her!      [4] Escape to the beginning!
    `);

    rl.question("Choose action: ", (answer) => {
      switch (answer) {
        case "1":
          console.clear();
          this.givePage();
          break;

        case "2":
          console.clear();
          this.consequencePage();
          break;

        case "3":
          console.clear();
          this.stealConsequencePage();
          break;

        case "4":
          console.clear();
          this.mainPage();
          break;

        default:
          console.clear();
          console.log("Oops! You can't do that.");
          this.womanRequestPage();
      }
    });
  }

  givePage() {
    const page = `

What do you want to give her? You have unlimited options:
swords, shields, helmets, shirts, hats, cloaks, belts, and many more.

`;

    console.log(page);

    rl.question("Weapon: ", (weapon) => {
      rl.question("Clothing: ", (clothing) => {
        console.log("");

        console.log("[1] Give it to her.  [2] Escape to the beginning!");
        console.log("");

        rl.question("Choose action: ", (answer) => {
          //
          switch (answer) {
            case "1":
              let newData = {
                weapon: weapon,
                clothing: clothing,
              };

              this.treasureItems.push(newData); //shows new data added to the records in constructor /

              console.clear();
              console.log("She accepted!");
              this.inventoryPage();
              break;

            case "2":
              console.clear();
              this.mainPage();
              break;

            default:
              console.clear();
              console.log("You said you'd give her something!");
              this.givePage();
          }
        });
      });
    });
  }

  inventoryPage() {
    const page = `

    She looks at her updated inventory below and beams. 
    She steps towards you and lightly touches your head. 
    A shower of sparkles. You feel a slight tingling and close your eyes.
                       𐙚‧₊˚📜✩ ₊˚⊹♡
    You were transported to an ancient library! 
    In front of you is a beautiful box. What do you do?

    [1] Open it.      [2] Don't risk it. Start over.
    `;

    console.log(page);

    console.table(this.treasureItems);

    rl.question("Choose action: ", (answer) => {
      switch (answer) {
        case "1":
          console.clear();
          this.ending1Page();
          break;

        case "2":
          console.clear();
          this.mainPage();
          break;

        default:
          console.clear();
          console.log("Oops! Can't do that.");
          this.inventoryPage();
      }
    });
  }

  consequencePage() {
    const page = `

The woman screams. She quickly walks towards you and pokes your heart.
Your head hurts, and you close your eyes.

When you open your eyes, you're knee-deep in floodwater.
In front of you is a group of women also dressed in gray cloaks.
All with swords. Pointed at you.

They tell you to give your most valuable possessions.
Or else.
    `;

    console.log(page);
    rl.question("Give a weapon: ", (weapon) => {
      rl.question("Give an item of clothing: ", (clothing) => {
        console.log("");

        console.log(
          "[1] Toss it to them.  [2] Escape this. Start over!"
        );
        console.log("");

        rl.question("Choose action: ", (answer) => {
          switch (answer) {
            case "1":
              let newData = {
                weapon: weapon,
                clothing: clothing,
              };

              this.treasureItems.push(newData); //shows new data added to the records in constructor

              console.clear();
              //              console.log("She accepted!");
              this.consequence2Page();
              break;

            case "2":
              console.clear();
              this.mainPage();
              break;

            default:
              console.clear();
              console.log("You said you'd give her something!");
              this.consequencePage();
          }
        });
      });
    });
  }

  consequence2Page() {
    const page = `
    
The women look at their updated inventory. They are satisfied.`

    console.log(page);

    console.table(this.treasureItems);

console.log(`

But one growls at you: "Why were you so selfish to our sister?" 
She steps towards you and pokes your heart. 

[1] See what happens next.      [2] Don't risk it. Start over.

`);


    rl.question("Choose action: ", (answer) => {
      switch (answer) {
        case "1":
          console.clear();
          this.ending2Page();
          break;

        case "2":
          console.clear();
          this.mainPage();
          break;

        default:
          console.clear();
          console.log("Oops! Can't do that.");
          this.consequence2Page();
      }
    });
  }

  treehousePage() {
    const page = `
      
You climb the treehouse and enter a room.
There you see a woman in a colorful cloak, with a bird on her head. 
She asks, "Can you help us?"
    
[1] Say yes.
[2] Definitely not!
[3] Escape! Go back to the beginning.
    `;

    console.log(page);

    rl.question("Choose action: ", (answer) => {
      switch (answer) {
        case "1":
          console.clear();
          this.treehouseRequestPage(); //update
          break;

        case "2":
          console.clear();
          this.treehouseConsequencePage(); //update
          break;

        case "3":
          console.clear();
          this.mainPage();
          break;

        default:
          console.clear();
          console.log("Oops! Can't do that.");
          this.treehousePage();
      }
    });
  }

  treehouseRequestPage() {
    const page = `
She shows you below a list of items stored in the treehouse.
She asks, "Can you give a weapon and one item of clothing, too?"
You are fully armed with swords, arrows, helmets, belts, cloaks, shirts, and many more.
    
    [1] Give something      [2] Say no.     
    [3] Steal from them!    [4] Escape to the beginning!
    `;

    console.log(page);

    console.table(this.treasureItems);

    rl.question("Choose action: ", (answer) => {
      switch (answer) {
        case "1":
          console.clear();
          this.treehouseGivePage();
          break;

        case "2":
          console.clear();
          this.treehouseConsequencePage();
          break;

        case "3":
          console.clear();
          this.stealConsequencePage();
          break;

        case "4":
          console.clear();
          this.mainPage();
          break;

        default:
          console.clear();
          console.log("Oops! You can't do that.");
          this.treehouseRequestPage();
      }
    });
  }

  treehouseGivePage() {
    const page = `

What do you want to give her? You have unlimited options:
swords, shields, helmets, shirts, hats, cloaks, belts, and many more.
 `;

    console.log(page);

    rl.question("Weapon: ", (weapon) => {
      rl.question("Clothing: ", (clothing) => {
        console.log("");

        console.log("[1] Give it to her.  [2] Escape to the beginning!");
        console.log("");

        rl.question("Choose action: ", (answer) => {
          //
          switch (answer) {
            case "1":
              let newData = {
                weapon: weapon,
                clothing: clothing,
              };

              this.treasureItems.push(newData);

              console.clear();
              console.log("She accepted!");
              this.treehouseInventoryPage();
              break;

            case "2":
              console.clear();
              this.mainPage();
              break;

            default:
              console.log("You said you'd give her something!");
              this.treehouseGivePage();
          }
        });
      });
    });
  }

  treehouseInventoryPage() {
    //4
    const page = `
    
The woman and the bird look at their updated inventory. The woman smiles.
    
She steps towards you and lightly touches your head. 
A shower of sparkles. You feel a slight tingling and close your eyes.

                𐙚‧₊˚📜✩ ₊˚⊹♡
You were transported to an ancient library!
In front of you is a beautiful box. What do you do?

[1] Open it.      [2] Don't risk it. Start over.`;

    console.log(page);
    console.table(this.treasureItems);

    rl.question("Choose action: ", (answer) => {
      switch (answer) {
        case "1":
          console.clear();
          this.ending1Page();
          break;

        case "2":
          console.clear();
          this.mainPage();
          break;

        default:
          console.clear();
          console.log("Oops! Can't do that.");
          this.treehouseInventoryPage();
      }
    });
  }

  treehouseConsequencePage() {
    const page = `

The woman screams. She quickly walks towards you and pokes your heart.
Your head hurts, and you close your eyes.

When you open your eyes, you're high up a big tree branch.
You're surrounded by a group of women, 
all with birds on their heads.
All with swords. Pointed at you.

They tell you to give your most valuable possessions.
Or else.
    `;

    console.log(page);
    rl.question("Give a weapon: ", (weapon) => {
      rl.question("Give a piece of clothing: ", (clothing) => {
        console.log("");

        console.log(
          "[1] Give it to them.  [2] Escape this. Start over!"
        );
        console.log("");

        rl.question("Choose action: ", (answer) => {
          switch (answer) {
            case "1":
              let newData = {
                weapon: weapon,
                clothing: clothing,
              };

              this.treasureItems.push(newData);

              console.clear();
              this.treehouseConsequence2Page();
              break;

            case "2":
              console.clear();
              this.mainPage();
              break;

            default:
              console.clear();
              console.log("You said you'd give her something!");
              this.treehouseConsequencePage();
          }
        });
      });
    });
  }

  treehouseConsequence2Page() {
    //4
    const page = `
    
The women look at their updated inventory. They are satisfied.
But one growls at you: "Why were you so selfish to our sister?" 
She steps towards you and pokes your heart. 

[1] See what happens next.      [2] Don't risk it. Start over.
    `;

    console.log(page);

    console.table(this.treasureItems);

    rl.question("Choose action: ", (answer) => {
      switch (answer) {
        case "1":
          console.clear();
          this.ending2Page();
          break;

        case "2":
          console.clear();
          this.mainPage();
          break;

        default:
          console.clear();
          console.log("Oops! Can't do that.");
          this.treehouseConsequence2Page();
      }
    });
  }

  stealConsequencePage() {
    const page = `
 
You stole from her and got the following!`;

    console.log(page);

console.table(this.treasureItemsDuplicate.pop());

    console.log(`
The woman screams and starts chanting.
She's speaking the language you wanted to learn: Java Script.

You feel your body tingle all over, and you close your eyes.

[1] Open your eyes.      [2] Don't risk it. Start over.
    
    `);

    rl.question("Choose action: ", (answer) => {
      switch (answer) {
        case "1":
          console.clear();
          this.ending3Page();
          break;

        case "2":
          console.clear();
          this.mainPage();
          break;

        default:
          console.clear();
          console.log("Oops! Can't do that.");
          this.stealConsequencePage();
      }
    });
  }

  ending1Page() {
    const page = `

You open the box and find a shining scroll.
Success!
It contains the very thing you seek: 
the mythical ᒚ ᗩ ᐺ ᗩ S ᑢ ᖇ ᓰ ᕵ ᖶ.

You have learned the ᒚ ᗩ ᐺ ᗩ S ᑢ ᖇ ᓰ ᕵ ᖶ language!


[1] Back to main page       [2] See the inventory again.
    `;

    console.log(page);

    rl.question("Choose action: ", (answer) => {
      switch (answer) {
        case "1":
          console.clear();
          this.mainPage();
          break;

        case "2":
          console.clear();
          this.itemCheckPage();
          break;

        default:
          console.clear();
          console.log("Oops! Can't do that.");
          this.ending1Page();
      }
    });
  }

  ending2Page() {
    const page = `

The women all chant something--
it's the language you wanted to learn: 
    ᒚ ᗩ ᐺ ᗩ S ᑢ ᖇ ᓰ ᕵ ᖶ.

There's a big flash. You close your eyes.

You feel a slight tingling and when you open your eyes,
you're back where you started, but this time, 
you have no pants on.

[1] Begin again.
`;

    console.log(page);

    rl.question("Choose action: ", (answer) => {
      switch (answer) {
        case "1":
          console.clear();
          this.mainPage();
          break;

        default:
          console.clear();
          console.log("Oops! Can't do that.");
          this.ending2Page();
      }
    });
  }

  ending3Page() {
    const page = `

    .˳·˖✶𓆩𓁺𓆪✶˖·˳.
When you open your eyes,
you're back where you started.
                        (𓁹 𓁹)        
But wait, something's wrong--
You can't speak anymore!
Faintly, you hear the woman's voice in your head:
"That's what happens to people who steal."


[1] Begin again.
    `;

    console.log(page);

    rl.question("Choose action: ", (answer) => {
      switch (answer) {
        case "1":
          console.clear();
          this.mainPage();
          break;

        default:
          console.clear();
          console.log("Oops! Can't do that.");
          this.ending3Page();
      }
    });
  }

  itemCheckPage() {
    const page = `
            ⚔⚔⚔⚔⚔
Look at the updated inventory.

[1] Start from the main page. 
[2] Start from the big tree.
    `;

    console.log(page);

    //display record
    console.table(this.treasureItems);

    rl.question("Choose action: ", (answer) => {
      switch (answer) {
        case "1":
          console.clear();
          this.mainPage();
          break;

        case "2":
          console.clear();
          this.goodLuck();
          break;

        default:
          console.clear();
          console.log("Oops! You can't do that.");
          this.itemCheckPage();
      }
    });
  }

  giveMorePage() {
    const page = `

A magical chest appears in front of you.
Enter the weapon and clothing you want to give.

        `;

    console.log(page);

    rl.question("Weapon: ", (weapon) => {
      rl.question("Clothing: ", (clothing) => {
        console.log("");

        console.log("[1] Give it.  [2] Changed my mind!");
        console.log("");

        rl.question("Choose action: ", (answer) => {
          //
          switch (answer) {
            case "1":
              let newData = {
                weapon: weapon,
                clothing: clothing,
              };

              this.treasureItems.push(newData);

              console.clear();
              console.log("Your items were added!");
              this.itemCheckPage();
              break;

            case "2":
              console.clear();
              this.mainPage();
              break;

            default:
              console.log("You said you'd give her something!");
              this.giveMorePage();
          }
        });
      });
    });
  }

  run() {
    this.mainPage();
  }
}

const myApp = new App("The First Language"); 
myApp.run();
