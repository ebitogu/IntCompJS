

/***
	PROBLEM STATEMENT:

	So, I am currently working on a software and an integral part of the software is 
	lossless natural numbers compression.That is losslessly encoding a pair of numbers into another unique 
	natural number and be able to get back the pair if given the unique number. 

	This works flawlessly except that the pairing functions generates astronomically large numbers fairly
	quickly

	My current issue now is to figure out a way to compress this large numbers to smaller numbers and be 
	able to get back the large numbers given the small numbers.

	I could do this easily with hexadecimals, but they won't work well with what I currently have.

	So,let's have a practical example:

	Assuming I want to losslessly encode two natural numbers [43208,32485] into another unique natural 
	number, below is how it's currently done

	var pairables = [43208,32485];
	var encoded = pair(pairables);

	The encoded result = 1866996234.

	You can find the logic of the pair and unpair functions below.

	Now assuming I want to now pair [1866996234,65536], Result would now be = 3485674937770313700; //Now the number is too large for me to work with in java

	My current task now is how to reduce large numbers like 1866996234 into another smaller number, 
	so I could instead use that smaller number and pair with other numbers incrementally
	but whenever I see the smaller number I should be able to know that it is a minified
	representation of a large numer, say 1866996234.

	So asssuming:
	    var expansion = 1866996234
		var reduction = 28488; // Whenever I see 28488 I should be able to get back to 1866996234 from it.


	I could create a mapping of small numbers to large numbers in an embedded local database, 
	but I currently do not have the computing power for that as it would certainly be time consuming,
	it would definitely span months to complete should I do that on my current development machine.

	Do you think you can help out or come up with a better approach of large number reduction other than 
	hexadecimals. 


	I have exhausted StackOverFlow and Quora with no result.

	***/


	/**
	 Losslessly encodes two natural numbers into a single unique number.

	 @return the encoded natural number.
	**/
	function pair(naturals){
		let a = naturals[0];
		let b = naturals[1];
		//Let's get the maximum and minimum of the two natural numbers
		let max = Math.max(a,b);
		let min =Math.min(a,b);
		let flag = 0; 
		if (min!=b) {
			flag =1;
		}
		let maxSqr = Math.pow(max,2);
		return maxSqr + (min*2) + flag;
	}


	/**
	Decodes a pair of natural numbers from a single natural number

	@return the unpaired naturals.
	**/
	function unpair(encoded){
		let max = parseInt(Math.sqrt(encoded));  
		let remainder = parseInt(encoded-Math.pow(max,2));
		let min = parseInt(Math.floor(remainder/2));
		if (remainder % 2==0) {
			return [max,min];
		}else{
			return [min, max];
		}
	}

	/**
	Generate a random number between 0 and 65536(Exclusive upper bound)
	*/
	function generateRandomNumber(){
		return parseInt(1 + Math.random() * 65536);
	}

	/***
	Attempt to reduce large numbers using modular arithmetic.

	This serves a purpose but didn't work out well as we are gonna end up with two numbers the 
	[quotient and the remainder]. We need just one of them to work with but certainly 
	just one can't work without knowledge of the other.
	**/
	function attemptMOD(largeNumber){
		//Using a constant divisor of 65536
		let divisor = 65536;
		let quotient = parseInt(largeNumber/divisor);
		let remainder = largeNumber % divisor;
		return [quotient,remainder];
	}

	/**
	Test function for testing the different attempted functions of large numbers reduction
	**/
	function test(){
	
		let pairables = [generateRandomNumber(),generateRandomNumber()];
		
		let result = pair(pairables);
		
		console.log("Pairables\n" + pairables + " Result=" +result);

		let unpairedResult = unpair(result);
		
		console.log("UnPairedResult=" + unpairedResult);

		console.log("==================REDUCTION ATTEMPTS================");

		let modAttempt = attemptMOD(result);
		
		console.log("Mod of " + result + " = " + modAttempt);
	
	}

	test();