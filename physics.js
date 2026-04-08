const {
    Engine,
    Render,
    Runner,
    Bodies,
    Composite,
    Mouse,
    MouseConstraint
} = Matter;

// engine
const engine = Engine.create();
const world = engine.world;

// gravity
engine.gravity.y = 1;

// renderer
const render = Render.create({
    element: document.querySelector(".envelope-container"),
    engine: engine,
    options: {
        width: window.innerWidth,
        height: 300,
        wireframes: false,
        background: "transparent"
    }
});

// boundaries
const floor = Bodies.rectangle(
    window.innerWidth / 2,
    290,
    window.innerWidth,
    20,
    { isStatic: true, render: { visible: false } }
);

const leftWall = Bodies.rectangle(
    0,
    150,
    20,
    300,
    { isStatic: true, render: { visible: false } }
);

const rightWall = Bodies.rectangle(
    window.innerWidth,
    150,
    20,
    300,
    { isStatic: true, render: { visible: false } }
);

// envelopes
const env1 = Bodies.rectangle(200, 50, 90, 60, {
    restitution: 0.7,
    friction: 0.2,
    render: {
        sprite: {
            texture: "letter1.png",
            xScale: 0.15,
            yScale: 0.15
        }
    }
});

const env2 = Bodies.rectangle(400, 30, 90, 60, {
    restitution: 0.7,
    friction: 0.2,
    render: {
        sprite: {
            texture: "letter2.png",
            xScale: 0.15,
            yScale: 0.15
        }
    }
});

Composite.add(world, [
    floor,
    leftWall,
    rightWall,
    env1,
    env2
]);

// mouse drag
const mouse = Mouse.create(render.canvas);

const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: { visible: false }
    }
});

Composite.add(world, mouseConstraint);

// run
Render.run(render);
Runner.run(Runner.create(), engine);