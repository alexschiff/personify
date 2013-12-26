$(document).ready(function() {
	
	$('#submitButtonEmail').click(function() {
		var email = $('#Email').val();
	

	$.fullcontact.emailLookup('fdd4a159a9943b57', email, function(obj) {
		console.log(obj);
		
		if (obj.status == 200) {

			var person = obj

			console.log("Identity found!")
			console.log(person)

			if (person.hasOwnProperty('contactInfo') === false) {
				alert("Email exists, but no information found.")
			}

			$('#fullNameHeader').text('Found '+person.contactInfo.fullName+' with '+person.likelihood+' likelihood!')
			console.log(person.contactInfo.fullName)

			var srcOfPhoto = person.photos[0].url
			console.log(srcOfPhoto)

			$('#photo').attr("src", srcOfPhoto);

			
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

			if (person.hasOwnProperty('socialProfiles') === true) {
			
				for (var i = 0; i < person.socialProfiles.length; i++) {
					if (person.socialProfiles[i].typeName === "Twitter") {
						var Twitter = person.socialProfiles[i].url;
						$('#summaryContainer').append('<a href="'+Twitter+'"><img class="socialButton" id="Twitter" src="http://www.vjbooks.com/v/vspfiles/assets/images/official%20twitter%20button%20-%20300.png"/></a>')

					}
					if (person.socialProfiles[i].typeName === "Facebook") {
						var Facebook = person.socialProfiles[i].url;
						$('#summaryContainer').append('<a href="'+Facebook+'"><img class="socialButton" id="Facebook" src="http://web.mit.edu/misti/images/Facebook%20Button.png"/></a>')
					}
					if (person.socialProfiles[i].typeName === "LinkedIn") {
						var LinkedIn = person.socialProfiles[i].url;
						$('#summaryContainer').append('<a href="'+LinkedIn+'"><img class="socialButton" id="LinkedIn" src="http://www.ldcgasforums.com/Assets/Image/Linkedin_Button(1).jpg"/></a>')
					}

				}
			}	

		}




	
		else {
			console.log('Error!')
		}

	});
	
	});

});


// Need to do error-handling for when a property doesn't exist.