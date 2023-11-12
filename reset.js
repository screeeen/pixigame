function reset() {
	tilesCollision = [];

	time = 4000;
	timeDown = 10;
	stopWatch();

	const createMaze = (rows, cols) => {
		const maze = Array.from({ length: rows }, () => Array(cols).fill(1));

		const recursiveBacktracking = (row, col) => {
			const directions = [
				[0, 2],
				[2, 0],
				[0, -2],
				[-2, 0],
			];
			directions.sort(() => Math.random() - 0.5);

			for (const [dr, dc] of directions) {
				const newRow = row + dr;
				const newCol = col + dc;

				if (
					newRow >= 0 &&
					newRow < rows &&
					newCol >= 0 &&
					newCol < cols &&
					maze[newRow][newCol] === 1
				) {
					maze[row + dr / 2][col + dc / 2] = 0;
					maze[newRow][newCol] = 0;
					recursiveBacktracking(newRow, newCol);
				}
			}
		};

		const startRow = 0;
		const startCol = 0;
		maze[startRow][startCol] = 0;
		recursiveBacktracking(startRow, startCol);

		printMaze(maze);

		return [].concat(...maze);
	};

	const printMaze = (maze) => {
		for (const row of maze) {
			console.log(row.join(' '));
		}
	};

	const tileSize = 32;

	const generateGrid = () => {
		const grid = [];
		for (let x = 0; x < 160; x += tileSize) {
			grid.push([]);
			for (let y = 0; y < 128; y += tileSize) {
				grid[grid.length - 1].push({ x, y, isWall: false });
			}
		}

		return [].concat(...grid);
	};

	const rows = 5;
	const cols = 4;

	const grid = generateGrid();
	const maze = createMaze(rows, cols);

	const blockers = [4, 5, 6];
	const paths = [0, 1, 2, 3, 7, 8, 9];

	for (let i = 0; i < grid.length; i++) {
		if (grid[i].x === 0 && grid[i].y === 0) continue;
		if (i === grid.length - 1) continue;

		console.log('maze[i]', i, grid.length - 1, maze[i]);
		grid[i].isWall = maze[i] === 0 ? false : true;

		let n = 1;
		if (grid[i].isWall) {
			n = blockers[Math.floor(Math.random() * blockers.length)];
		} else {
			n = paths[Math.floor(Math.random() * paths.length)];
		}

		tile = new Sprite(tex['tile00' + n.toString() + '.png']);
		tile.x = grid[i].x;
		tile.y = grid[i].y;
		grid[i].isWall && tilesCollision.push(tile);
		gameScene.addChild(tile);
	}
	console.log(grid);

	enter = new Sprite(tex['tile014.png']);
	enter.scale.x = -1;
	enter.x = 32;
	enter.y = 0;
	gameScene.addChild(enter);

	exit = new Sprite(tex['tile014.png']);
	exit.x = 128;
	exit.y = 96;
	gameScene.addChild(exit);

	player = new Sprite(tex['tile012.png']);
	player.x = 0;
	player.y = 0;
	gameScene.addChild(player);
}
