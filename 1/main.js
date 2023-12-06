process.stdin.on('readable', () => { 
	let chunk; 
	// Use a loop to make sure we read all available data. 
		while ((chunk = process.stdin.read()) !== null) { 

			console.time("elf");

			for(let a=0; a < 1; a++) {
				var elfArray = chunk.toString('utf8')

				elfArray = elfArray.split('\n\n');
				var summedelfArray = elfArray.map((x) => {
					return x.split('\n').reduce((a,v) => a + parseInt(v),0);
				}).sort(sortDesc);
			}		  
			console.timeEnd("elf");
			process.stdout.write(`Total of 3 elfs: ${summedelfArray[0] + 
					summedelfArray[1] + 
					summedelfArray[2]}
				\n`)
		} 				
});


const sortDesc = (a, b) => {
	return b - a
}
