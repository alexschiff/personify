$(document).ready(function() {
	
	$('#submitButtonGuess').click(function() {
		var firstName = $('#firstName').val();
		var lastName = $('#lastName').val();
		var domain = $('#domain').val();

		var attemptsArray = [firstName+'@'+domain, firstName+'.'+lastName+'@'+domain, firstName[0]+'.'+lastName+'@'+domain, firstName[0]+lastName+'@'+domain, firstName+'_'+lastName+'@'+domain, firstName[0]+'_'+lastName+'@'+domain, lastName+'@'+domain, firstName[0]+'@'+domain]

		var correctAttempts = [];

		var attemptsMade = 0;

		attemptsArray.forEach(function(attempt) {
			$.fullcontact.emailLookup('fdd4a159a9943b57', attempt, function(obj) {
				attemptsMade++;
				console.log(attemptsMade);
				
				if (obj.status === 200) {
					var Match = {
						score: obj.likelihood,
						email: attempt
					}
					correctAttempts.push(Match);
				};
			});
		});

		if (attemptsMade === attemptsArray.length) {
			console.log(correctAttempts);
			var top = {
				score: 0
			};

			for (var i=0; i<correctAttempts.length; i++) {
				if (correctAttempts[i].score > top.score) {
					top = correctAttempts[i];
				};
			};
			console.log("The most likely email is " + top.email+'. However, click the triangle below to see what also returned results:');
			console.log(correctAttempts);

			$.fullcontact.emailLookup('fdd4a159a9943b57', top.email, function(obj) {
				console.log(JSON.stringify(obj, null, 2));
				
				if (obj.status == 200) {

					console.log("Identity found!")

					var person = obj

					if (person.hasOwnProperty('contactInfo') === false) {
						alert("Email exists, but no information found.")
					}

					$('#fullNameHeader').text('Found '+person.contactInfo.fullName+' with '+person.likelihood+' likelihood!')

					if (person.hasOwnProperty('photos') === true) {

					var srcOfPhoto = person.photos[0].url

					$('#photo').attr("src", srcOfPhoto);

					}

					else {
						var srcOfPhoto = "http://upload.wikimedia.org/wikipedia/en/f/f5/Question_mark.PNG"
						$('#photo').attr("src", srcOfPhoto);	
					}

					if (person.hasOwnProperty('demographics') === true) {

						if (person.demographics.hasOwnProperty('gender') === true) {

						$('#gender').text('Gender: '+person.demographics.gender);

						}
					}

					else {
						$('#gender').text('Gender: Undefined');
					}

					
					if (person.hasOwnProperty('demographics') === true) {
						
						if (person.demographics.hasOwnProperty('locationGeneral') === true) {

						$('#location').text('Location: '+person.demographics.locationGeneral);

						}
					}

					else {
						$('#location').text('Location: Undefined');
					}

					
					if (person.contactInfo.hasOwnProperty('websites') === true) {
						$('#website').text('Website: '+person.contactInfo.websites[0].url);
					}

					else {
						$('#website').text('Website: Undefined');
					}

					
					if (person.hasOwnProperty('organizations') === true) {
					
						for (var i = 0; i < person.organizations.length; i++) {
							if (person.organizations[i].current === true) {
								var currentRoleTitle = person.organizations[i].title;
								var currentRoleCompany = person.organizations[i].name;
							}
						}

						$('#currentJob').text('Current Role: '+currentRoleTitle+" at "+currentRoleCompany)
					}

					else {
						$('#currentJob').text('Current Role: Undefined')
					}

					$('#email').text('Most likely email: '+top.email);

					$('#console').text('Hacker? Open up the console for more details.')

					if (person.hasOwnProperty('socialProfiles') === true) {
					

						if (person.socialProfiles.hasOwnProperty('Twitter') === false) {
							$('#Twitter').css('display', 'none')
						}

						if (person.socialProfiles.hasOwnProperty('Facebook') === false) {
							$('#Facebook').css('display', 'none')
						}

						if (person.socialProfiles.hasOwnProperty('LinkedIn') === false) {
							$('#LinkedIn').css('display', 'none')
						}



						for (var i = 0; i < person.socialProfiles.length; i++) {

							if (person.socialProfiles[i].typeName === "Twitter") {
								var Twitter = person.socialProfiles[i].url;
								$('#Twitter').css('display', 'inline-block')
								$('#Twitter').wrap('<a href="'+Twitter+'"></a>')
							}
							
							if (person.socialProfiles[i].typeName === "Facebook") {
								var Facebook = person.socialProfiles[i].url;
								$('#Facebook').css('display', 'inline-block')
								$('#Facebook').wrap('<a href="'+Facebook+'"></a>')
							}

							if (person.socialProfiles[i].typeName === "LinkedIn") {
								var LinkedIn = person.socialProfiles[i].url;
								$('#LinkedIn').css('display', 'inline-block')
								$('#LinkedIn').wrap('<a href="'+LinkedIn+'"></a>')
							}
						}
					}

					if (person.hasOwnProperty('digitalFootprint') === true) {
						
						if (person.digitalFootprint.hasOwnProperty('scores') === true) {

						$('#Klout').text('Klout Score: '+person.digitalFootprint.scores[0].value);

						}

					else {
						$('#Klout').text('Klout Score: Undefined')
					}

					}
						

				}

		if (obj.status === 202) {
			alert('Never seen that email before! Try again in 5 minutes after we search the interwebs.')
			$('#fullNameHeader').empty();
			$('.miniSummary').empty();
			$('.socialButton').css('display', 'none');
			$('#photo').removeAttr('src');
		}

		if (obj.status === 422) {
			alert("Uh oh! Something went wrong. Try again please :)")
			$('#fullNameHeader').empty();
			$('.miniSummary').empty();
			$('.socialButton').css('display', 'none');
			$('#photo').removeAttr('src');
		};
			
			});



		};

	});

	$('#submitButtonEmail').click(function() {
		var email = $('#EmailSearch').val();
	

	$.fullcontact.emailLookup('fdd4a159a9943b57', email, function(obj) {
		console.log(JSON.stringify(obj, null, 2));
		
		if (obj.status == 200) {

			var person = obj

			if (person.hasOwnProperty('contactInfo') === false) {
				alert("Email exists, but no information found.")
			}

			$('#fullNameHeader').text('Found '+person.contactInfo.fullName+' with '+person.likelihood+' likelihood!')

			if (person.hasOwnProperty('photos') === true) {

			var srcOfPhoto = person.photos[0].url

			$('#photo').attr("src", srcOfPhoto);

			}

			else {
				var srcOfPhoto = "http://upload.wikimedia.org/wikipedia/en/f/f5/Question_mark.PNG"
				$('#photo').attr("src", srcOfPhoto);	
			}

			if (person.hasOwnProperty('demographics') === true) {

				if (person.demographics.hasOwnProperty('gender') === true) {

				$('#gender').text('Gender: '+person.demographics.gender);

				}
			}

			else {
				$('#gender').text('Gender: Undefined');
			}

					
			if (person.hasOwnProperty('demographics') === true) {
				
				if (person.demographics.hasOwnProperty('locationGeneral') === true) {

				$('#location').text('Location: '+person.demographics.locationGeneral);

				}
			}

			else {
				$('#location').text('Location: Undefined');
			}

			
			if (person.contactInfo.hasOwnProperty('websites') === true) {
				$('#website').text('Website: '+person.contactInfo.websites[0].url);
			}

			else {
				$('#website').text('Website: Undefined');
			}

			$('#email').text('Most likely email: '+$('#EmailSearch').val());

			$('#console').text('Hacker? Open up the console to see more details.')


			if (person.hasOwnProperty('organizations') === true) {
			
				for (var i = 0; i < person.organizations.length; i++) {
					if (person.organizations[i].current === true) {
						var currentRoleTitle = person.organizations[i].title;
						var currentRoleCompany = person.organizations[i].name;
					}
				}

				$('#currentJob').text('Current Role: '+currentRoleTitle+" at "+currentRoleCompany)
			}

			else {
				$('#currentJob').text('Current Role: Undefined')
			}

			if (person.hasOwnProperty('socialProfiles') === true) {
			

				if (person.socialProfiles.hasOwnProperty('Twitter') === false) {
					$('#Twitter').css('display', 'none')
				}

				if (person.socialProfiles.hasOwnProperty('Facebook') === false) {
					$('#Facebook').css('display', 'none')
				}

				if (person.socialProfiles.hasOwnProperty('LinkedIn') === false) {
					$('#LinkedIn').css('display', 'none')
				}



				for (var i = 0; i < person.socialProfiles.length; i++) {

					if (person.socialProfiles[i].typeName === "Twitter") {
						var Twitter = person.socialProfiles[i].url;
						$('#Twitter').css('display', 'inline-block')
						$('#Twitter').wrap('<a href="'+Twitter+'"></a>')
					}
					
					if (person.socialProfiles[i].typeName === "Facebook") {
						var Facebook = person.socialProfiles[i].url;
						$('#Facebook').css('display', 'inline-block')
						$('#Facebook').wrap('<a href="'+Facebook+'"></a>')
					}

					if (person.socialProfiles[i].typeName === "LinkedIn") {
						var LinkedIn = person.socialProfiles[i].url;
						$('#LinkedIn').css('display', 'inline-block')
						$('#LinkedIn').wrap('<a href="'+LinkedIn+'"></a>')
					}
				}
			}

			if (person.hasOwnProperty('digitalFootprint') === true) {
				
				if (person.digitalFootprint.hasOwnProperty('scores') === true) {

				$('#Klout').text('Klout Score: '+person.digitalFootprint.scores[0].value);

				}

			else {
				$('#Klout').text('Klout Score: Undefined')
			}

			}
				

		}

		if (obj.status === 202) {
			alert('Never seen that email before! Try again in 5 minutes after we search the interwebs.')
			$('#fullNameHeader').empty();
			$('.miniSummary').empty();
			$('.socialButton').css('display', 'none');
			$('#photo').removeAttr('src');
		}

		if (obj.status === 422) {
			alert("Uh oh! Something went wrong. Try again please :)")
			$('#fullNameHeader').empty();
			$('.miniSummary').empty();
			$('.socialButton').css('display', 'none');
			$('#photo').removeAttr('src');
		};


	});
	
	});

});