import { Component } from "react";

export default class Ui extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isdata: false,
      setNewMenu: false,
      inpValue: "",
      setUpdateMenu: false,
      updateInputVal: "",
      updIdx: 0,
    };
  }

  componentDidMount() {
    fetch("https://renderhm.onrender.com/menus")
      .then((res) => res.json())
      .then((json) => {
        // console.log("i am jsn",json)
        // console.log(this.state.data)
        this.setState({ data: json, isdata: true });

        // This is how you can check using call back function remember that component didMount k karan data turant dikh nhi rha tha kyoki api se aa rha tha isliye     to callback k andar tum check kr skte ho ya direct hi map  kara do aur kya
        // this.setState({ data: json }, () => {
        //     // This callback is called after the state has been set
        //     console.log("Updated state data:", this.state.data);
        // });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  openSetMenu = () => {
    this.setState({ setNewMenu: true });
  };

  updateMenu = () => {
    this.setState({ setUpdateMenu: false });

    const updateData = {
      menu_type: this.state.updateInputVal,
    };
    console.log(this.state.data);
    console.log("Yes ", this.state.updIdx);

    fetch(
      `https://renderhm.onrender.com/menus/${
        this.state.data[this.state.updIdx].id
      }`,
      {
        method: "PUT",
        body: JSON.stringify(updateData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };

  setMenu = () => {
    if (this.state.inpValue !== "") {
      this.setState({ setNewMenu: false });

      fetch("https://renderhm.onrender.com/menus", {
        method: "POST",

        body: JSON.stringify({
          menu_type: this.state.inpValue,
        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } else {
      this.setState({ setNewMenu: false });
    }
  };

  render() {
    const { data, isdata, setNewMenu, inpValue, setUpdateMenu } = this.state;

    if (!isdata) {
      <h1>Keep waiting ......</h1>;
    }
    return (
      <>
        {/* Second Pop Up */}

        {setUpdateMenu ? (
          <div
            style={{
              border: "2px solid black",
              height: "200px",
              width: "400px",
              backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "15px",
              position: "absolute",
              top: "300px",
              left: "700px",
            }}
          >
            <input
              type="text"
              onChange={(e) =>
                this.setState({ updateInputVal: e.target.value }, () => {
                  console.log(this.state.updateInputVal);
                })
              }
              style={{ width: "250px", height: "50px" }}
            />
            <button
              onClick={this.updateMenu}
              style={{
                width: "200px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Submit
            </button>
            <button
              onClick={() => this.setState({ setUpdateMenu: false })}
              style={{
                width: "200px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <span></span>
        )}

        {/* pop up */}
        {setNewMenu ? (
          <div
            style={{
              border: "2px solid black",
              height: "200px",
              width: "400px",
              backgroundColor: "yellow",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "15px",
              position: "absolute",
              top: "300px",
              left: "700px",
            }}
          >
            <input
              type="text"
              onChange={(e) =>
                this.setState({ inpValue: e.target.value }, () => {
                  console.log(inpValue);
                })
              }
              style={{ width: "250px", height: "50px" }}
            />
            <button
              onClick={this.setMenu}
              style={{
                width: "200px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Submit
            </button>
            <button
              onClick={() => this.setState({ setNewMenu: false })}
              style={{
                width: "200px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <span></span>
        )}

        {/* Food itemss */}

        <div style={{ textAlign: "center", padding: "20px" }}>
          <button
            onClick={this.openSetMenu}
            style={{
              width: "300px",
              height: "50px",
              backgroundColor: "blue",
              color: "white",
              margin: "auto",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Wanna Set New Menu
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto auto",
            gap: "20px",
            marginTop: "50px",
            padding: "50px",
          }}
        >
          {data &&
            data.map((data, index) => {
              return (
                <div
                  key={index}
                  style={{
                    height: "200px",
                    width: "200px",
                    backgroundColor: "pink",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <p>{data.menu_type}</p>
                  <button
                    onClick={() => {
                      this.setState(
                        { setUpdateMenu: true, updIdx: index },
                        () => {
                          console.log(this.state.updIdx);
                        }
                      );
                    }}
                    style={{
                      width: "100px",
                      height: "30px",
                      backgroundColor: "blue",
                      color: "white",
                    }}
                  >
                    Update
                  </button>
                  <button
                    style={{
                      width: "100px",
                      height: "30px",
                      backgroundColor: "blue",
                      color: "white",
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </>
    );
  }
}
