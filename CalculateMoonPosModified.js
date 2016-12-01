	var ns4dom = (document.layers)? true:false;
	var ie4dom = (document.all)? true:false;
	var	ns6dom = false;
        //alert('ns4dom:' + ns4dom + '...ie4dom:' + ie4dom + '...ns6dom:' + ns6dom );
	// globals
	d2r = Math.PI/180;
	r2d = 180/Math.PI;
	var ra,dc;	// right ascension, declination
	var pln,plt; // parallax longitude and latitude
    	lord = "KeVeSuMoMaRaJuSaMe";
    	lord1 = "KetVenSunMonMarRahJupSatMer";
	var dasha = [7,20,6,10,7,18,16,19,17];
	var zn = "AriTauGemCanLeoVirLibScoSagCapAquPis";  // Zodiac
	var znl = "Mesh (Aries)~Rishabh (Taurus)~Mithun (Gemini)~Kark (Cancer)~Simha (Leo)~Kanya (Virgo)~Tula (Libra)~Vrishchik (Scorpio)~Dhanu (Sagittarius)~Makar (Capricorn)~Kumbh (Aquarius)~Meen (Pisces)";  // Zodiac
	zsign=znl.split("~")
	var range = [1,12,1,31,1800,2100,0,23,0,59,0,0,0,12,0,59,0,179,0,59,0,0,0,89,0,59]; 	
	var nakstar=["Ashwini","Bharani","Krittika","Rohini","Mrigashirsha","Ardra","Punarvasu",
	"Pushya","Ashlesha","Magha","Poorva Phalguni","Uttara Phalguni","Hasta","Chitra","Swaati",
	"Vishakha","Anuradha","Jyeshtha","Moola","Poorva Ashadha","Uttara Ashadha",
	"Shravan","Dhanishtha","Shatabhisha", "Purva Bhadrapada","Uttara Bhadrapada","Revati"];
	var vinter1 ="";
	var vinter2 ="";
    	var vinter3a = "";
	vinter3=vinter3a.split("~");
	vinter5a = "";
	vinter4=vinter5a.split("~");
 
 
// Fill out the form with current date and time
function fillDate(){
	today = new Date();
	//document.LunarCalc.Month.value = today.getMonth()+1;
        document.LunarCalc.Month.value = 1;
        document.LunarCalc.targetMonth.value = today.getMonth()+1;
	//document.LunarCalc.Day.value = today.getDate();
        document.LunarCalc.Day.value = 10;
        document.LunarCalc.targetDay.value = today.getDate();
	document.LunarCalc.Year.value = today.getFullYear()-33;
        document.LunarCalc.targetYear.value = today.getFullYear();
	//document.LunarCalc.Hour.value = today.getHours();
        document.LunarCalc.Hour.value = 10;
	//document.LunarCalc.Min.value = today.getMinutes();
        document.LunarCalc.Min.value = 30; 
	zmins = today.getTimezoneOffset();
	with(Math){
		zmins /= 60;
		if(zmins < 0.0){
			var eln = document.LunarCalc.East;
			eln.checked = true;
		}
		zmins = abs(zmins);
		//document.LunarCalc.ZHour.value = floor(zmins);
		//document.LunarCalc.ZMin.value = (zmins - floor(zmins)) * 60;
	}	
}


function checkEntries(f){

	for(i = 0; i < 6; i++){
		var e = f.elements[i];
		if((e.name == "DST") || (e.name == "East") || (e.name == "South"))continue;
		if(isNaN(e.value) || (e.value < range[i*2] ) || ( e.value > range[i*2+1])){
			//msg = "Please enter value between "
			//	+ range[i*2] + " and " + range[i*2+1]
			//	+ " in the " + e.name + " field"; 
                        /*var valMonth = document.LunarCalc.Month.value;
                        var valDay = document.LunarCalc.Day.value;
                        var valYear = document.LunarCalc.Year.value;
                        var errStatus = 0;
                        if ((valMonth == 4) || (valMonth == 6) || (valMonth == 9) || (valMonth == 11)) {
                          if (valDay > 30)  {
                            errStatus = 1;
                          } 
                        }
                        if (valMonth == 2) {
                          if ((valYear % 4) == 0) {
                            if (valDay > 29) errStatus = 1;
                          }
                          else {
                            if (valDay > 28) errStatus = 1;
                          }
                        } 
                        if (errStatus == 1) {
                          alert("Enter correct day for this month");
                          return true;
                        } */
                        msg = "Please enter correct " + e.name;
			alert(msg);
			return true;
		}
	}
	return false;
}


function launch() {
        var moonPositionBirth;
        var moonPositionTarget;
        var mon = Math.floor(document.LunarCalc.Month.value);
	var day = Math.floor(document.LunarCalc.Day.value);
	var year= Math.floor(document.LunarCalc.Year.value);
	moonPositionBirth = calculate(mon, day, year, 1);
        var moonDivisionBirth = moonPositionBirth/30.0;  
        var birthRashi = Math.floor(moonDivisionBirth) + 1;
        var birthNakshatra = Math.floor((moonPositionBirth * 60)/800.0 ) + 1 ;
        //document.display.ras.value = birthRashi;
        var mon = Math.floor(document.LunarCalc.targetMonth.value);
	var day = Math.floor(document.LunarCalc.targetDay.value);
	var year= Math.floor(document.LunarCalc.targetYear.value);
        moonPositionTarget = calculate(mon, day, year, 0);
        var moonDivisionTarget = moonPositionTarget/30.0;
        var targetRashi = Math.floor(moonDivisionTarget) + 1;
        //document.display.nkvalue.value = targetRashi;
        var targetNakshatra = Math.floor((moonPositionTarget * 60)/800.0 ) + 1 ;
        //document.display.birthNak.value = birthNakshatra;
        //document.display.targetNak.value = targetNakshatra;
        var rashiSteps = steps(birthRashi,targetRashi, 12);
        var nakshatraSteps = steps(birthNakshatra, targetNakshatra, 27);
        var chandraBal = true;
        switch (rashiSteps) {
          case 6:
                chandraBal= false;
                break;
          case 8: 
                chandraBal = false;
                break;  
          case 12:
                chandraBal = false;
                break; 
        }
        if (chandraBal == false){
          document.display.comment.value = 'Not a favorable day for YOU. Reason: Inauspicious Chandrabala or moon strength at position no.'+rashiSteps;
          return;
        }
        var taraBal;
        if (nakshatraSteps > 9) {
          if ((nakshatraSteps % 9) == 0 ) {
            taraBal = nakshatraSteps / 9;  
          }
          else {
            taraBal = Math.floor(nakshatraSteps % 9);
          }  
        }  
        else {
          taraBal = nakshatraSteps;
        } 
        var message = "";
        switch (taraBal) {
          case 1: message += "Not a favorable day. Avoid physically challenging activities. (TaraBala: Janma)";
                  break;
          case 2: message += "Favorable day for efforts towards wealth and prosperity. (TaraBala: Sampat)";
                  break;
          case 3: message += "Not a favorable day. Be careful on roads and avoid physical risk of all types. (TaraBala: Vipat)";
                  break;
          case 4: message += "Favorable day for growth, peace and prosperity. (TaraBala: Kshema)";
                  break;
          case 5: message += "Not a favorable day. The day will present more than usual obstacles/enmity. (TaraBala: Pratyak)";
                  break;
          case 6: message += "Favorable day. Excellent day to push hard to realize your ambitions. (TaraBala: Sadhana)";
                  break;
          case 7: message += "Not a Favorable day. Day is full of risks not worth taking. Avoid important work. (TaraBala: Naidhana)";
                  break;
          case 8: message += "Favorable day for all activities related to other people. Good day for important talk, make friends and reach out to people. (TaraBala: Mitra)";
                  break;
          case 9: message += "Favorable day for all activities including financial, relationships, business and social. (TaraBala: Param Mitra)";
                  break;
        }
        document.display.comment.value = message;
        //document.getElementById("SubscriptionButton").style.visibility = "display";
}

 
function steps(birth, target, limit) {
  var cnt = 1;

  if (birth < target) {
    cnt = (target-birth) +1;
  }
  if (birth > target) {
    cnt = (limit - birth) + target + 1;
  }
  return cnt;
}


function calculate(mon, day, year, show){
	
	if(checkEntries(document.LunarCalc))return;
        if (show == 1) {
          var hr= Math.floor(document.LunarCalc.Hour.value);
	  hr += Math.floor(document.LunarCalc.Min.value)/60;
        }
        else {
          var hr=10;
        }
	var tz= document.LunarCalc.country.options[document.LunarCalc.country.selectedIndex].value;
	var ln= tz*15;
	var la=0;
	
	// checks for checked DST, East, South
	var dst = document.LunarCalc.DST;
	var eln = document.LunarCalc.East;
	var sla = document.LunarCalc.South;
	
	if(tz > 0.0)ln = -ln;
//	if(sla.checked)la = -la;
	if(dst.checked){
		if(ln < 0.0)tz++;
		else tz--;
	}
 
	jd = mdy2julian(mon,day,year);
	if(ln < 0.0)f = hr - tz;
	else f = hr + tz;
	t = (jd - 2451545 - 0.5)/36525;
	gst = ut2gst(t,f);
	t = ((jd - 2451545) + f/24 - 0.5)/36525;
	ay = calcayan(t);
 
	ob = 23.452294 - 0.0130125 * t; //  Obliquity of Ecliptic
	
	// Calculate Moon longitude, latitude, and distance using truncated Chapront algorithm
	
	// Moon mean longitude
	l = (218.3164591 + 481267.88134236 * t);
	// Moon mean elongation
	d = (297.8502042 + 445267.1115168 * t);
	// Sun's mean anomaly
	m = (357.5291092 + 35999.0502909 * t);
	// Moon's mean anomaly
	mm = (134.9634114 + 477198.8676313 * t);
	// Moon's argument of latitude
	f = (93.2720993 + 483202.0175273 * t);
 
 	d *= d2r; m *= d2r; mm *= d2r; f *= d2r;
 
	e = 1 - 0.002516 * t - 0.0000074 * t * t;
 
	with(Math){
	p =		6.288774 * sin(mm)
			+ 1.274027 * sin(d*2-mm)
			+ 0.658314 * sin(d*2) 	
			+ 0.213618 * sin(2*mm)
			- 0.185116 * e * sin(m)
			- 0.114332 * sin(f*2);
 
	p +=	  0.058793 * sin(d*2 - mm * 2)
			+ 0.057066 * e * sin(d*2 - m - mm)
			+ 0.053322 * sin(d*2 + mm)
			+ 0.045758 * e * sin(d*2 - m)
			- 0.040923 * e * sin(m - mm)
			- 0.034720 * sin(d)
			- 0.030383 * e * sin(m + mm);
 
	p +=	  0.015327 * sin(d*2 - f*2)
			- 0.012528 * sin(mm + f*2)
			+ 0.010980 * sin(mm - f*2)
			+ 0.010675 * sin(d * 4 - mm)
			+ 0.010034 * sin(3 * mm);
 
	p +=	  0.008548 * sin(d * 4 - mm * 2)
			- 0.007888 * e * sin(d * 2 + m - mm)
			- 0.006766 * e * sin(d * 2 + m)
			- 0.005163 * sin(d - mm)
			+ 0.004987 * e * sin(d + m)
			+ 0.004036 * e * sin(d*2 - m + mm)
			+ 0.003994 * sin(d * 2 + mm * 2);
 
	b = 	  5.128122 * sin(f)
			+ 0.280602 * sin(mm+f)
			+ 0.277693 * sin(mm-f)
			+ 0.173237 * sin(d*2-f)
			+ 0.055413 * sin(d*2-mm+f)
			+ 0.046271 * sin(d*2-mm-f);
 
	b += 	  0.032573 * sin(2*d + f)
			+ 0.017198 * sin(2*mm + f)
			+ 0.009266 * sin(2*d + mm - f)
			+ 0.008823 * sin(2*mm - f)
			+ 0.008247 * e * sin(2*d - m - f)
			+ 0.004324 * sin(2*d - f - 2*mm);
 
	b += 	  0.004200 * sin(2*d +f+mm)
			+ 0.003372 * e * sin(f - m - 2 * d)
			+ 0.002472 * e * sin(2*d+f-m-mm)
			+ 0.002222 * e * sin(2*d + f - m)
			+ 0.002072 * e * sin(2*d-f-m-mm)
			+ 0.001877 * e * sin(f-m+mm);
 
	b += 	  0.001828 * sin(4*d-f-mm)
			- 0.001803 * e * sin(f+m)
			- 0.001750 * sin(3*f)
			+ 0.001570 * e * sin(mm-m-f)
			- 0.001487 * sin(f+d)
			- 0.001481 * e * sin(f+m+mm);
 
	r =		- 20905.355 * cos(mm)
			-  3699.111 * cos(d*2-mm)
			-  2955.968 * cos(d*2) 	
			-   560.925 * cos(2*mm)
			-    48.888 * e * cos(m)
			-     3.149 * cos(f*2);
 
	r =		0.950724 + 0.051818  * cos(mm)
			+ 0.009531 * cos(2*d - mm)
			+ 0.007843 * cos(2*d)
			+ 0.002824 * cos(2*mm)
			+ 0.000857 * cos(2*d + mm)
			+ 0.000533 * e * cos(2*d - m);
 
	r += 	0.000401 * e * cos(2*d-m-mm)
			+ 0.000320 * e * cos(mm-m)
			- 0.000271 * cos(d)
			- 0.000264 * e * cos(m+mm)
			- 0.000198 * cos(2*f - mm)
			+ 0.000173 * cos(3 * mm);
 
	r += 	0.000167 * cos(4*d - mm)
			- 0.000111 * e * cos(m)
			+ 0.000103 * cos(4*d - 2*mm)
			- 0.000084 * cos(2*mm - 2*d)
			- 0.000083 * e * cos(2*d + m)
			+ 0.000079 * cos(2*d + 2*mm)
			+ 0.000072 * cos(4*d);
 
	}
 	l += p;
	while(l < 0.0)l += 360.0;
	while(l > 360.0)l -= 360.0;
	//  Parallax calculations are found in Meeus, Duffett-Smith, Astrologic Almanac (etc)
	//  Topocentric calculations are done on RA and DEC 
	// start parallax calculations
	ecl2equ(l,b,ob);
	ln = -ln; // flip sign of longitude
	ln /= 15;
	ln += gst;
	while(ln < 0.0)ln += 24;
	while(ln > 24.0)ln -= 24;
	h = (ln - ra) * 15;
	with(Math){
		// calc observer latitude vars
		u = atan(0.996647 * tan(d2r *la));
		// hh = alt/6378140; // assume sea level
		s = 0.996647 * sin(u); // assume sealevel
		c = cos(u);	// + hh * cos(d2r(la)); // cos la' -- assume sea level
		r = 1/sin(d2r * r);
		dlt = atan2(c * sin(d2r*h),r * cos(d2r * dc) - c * cos(d2r* h));
		dlt *= r2d;
		hh = h + dlt;
		dlt /= 15;
		ra -= dlt;
		dc = atan(cos(d2r * hh) * ((r * sin(d2r * dc) - s)/
			(r * cos(d2r *dc) * cos(d2r*h) - c)) );
		dc *= r2d;
	}
	equ2ecl(ra,dc,ob);
	// dasha calculations
	l += ay;
	l += 0.10;
	if(l < 0.0)l += 360.0;
        if (show == 1) {
	  if (ns4dom) {
		document.layers.div2.document.display.npmoon.value = lon2dmsz(l);
	  } else {
		document.display.npmoon.value = lon2dmsz(l);
		document.display.moonpos.value = l;
	  }
        }
        //moonPosition = l;
        lon2zodiac(l);		
	nk = (l * 60)/800.0;	// get nakshatra
        if (show == 1) {
	  with(Math) {
	    if (ns4dom) {
              document.layers.div2.document.display.nnakshatra.value = nakstar[floor(nk)];
              //document.layers.div2.document.display.nkvalue.value = floor(nk);
            } 
            else {
		document.display.nnakshatra.value = nakstar[floor(nk)];
                //document.display.nkvalue.value = floor(nk);
	    }
          }
        }
	nl = Math.floor(nk) % 9;
	db = 1 - (nk - Math.floor(nk));
	bk = calcbhukti(db,nl);
	ndasha = (db * dasha[nl]) * 365.25;
	jd1 = jd + ndasha;
	d1 = nl;
	return l;
}
 		
 
function calcbhukti(db,dp)
{
	x = 1 - db; // find days elapsed
	y = 0;
	var buk = dp;
	for(i = 0; i < 9; i++){
		y += dasha[buk]/120; // percentage of period
		if(y > x)break;
		buk++;
		if(buk == 9)buk = 0;
	}
	return buk;
}
 

// Calculate Ayanamsa using J2000 Epoch
function calcayan(t)
{
	with(Math){
		ln = 125.0445550 - 1934.1361849 * t + 0.0020762 * t * t; // Mean lunar node
		off = 280.466449 + 36000.7698231 * t + 0.00031060 * t * t; // Mean Sun	
		off = 17.23*sin(d2r * ln)+1.27*sin(d2r * off)-(5025.64+1.11*t)*t;
		off = (off- 85886.27)/3600.0;
	}
	return off;
}
 
 
function ut2gst(t,ut)
{
	t0 = 6.697374558 + (2400.051336 * t) + (0.000025862 * t * t);
	ut *= 1.002737909;
	t0 += ut;
	while(t0 < 0.0)t0 += 24;
	while(t0 > 24.0)t0 -= 24;
	return t0;
}
 
function ecl2equ(ln,la,ob)
{
	with(Math){
		y = asin(sin(d2r *la ) * cos(d2r * ob ) + cos(d2r *la ) * sin(d2r *ob ) * sin(d2r * ln));
		dc = r2d * y;
		y = sin(d2r *ln ) * cos(d2r * ob) - tan(d2r * la) * sin(d2r * ob);
		x = cos(d2r * ln);
		x = atan2(y,x);
		x = r2d * x;
		if(x < 0.0)x += 360;
		ra = x/15;
	}
}
 

function equ2ecl(ra,dc,ob)
{
	ra *= 15;
	with(Math){
		y = sin(d2r *ra) * cos(d2r * ob) + tan(d2r *dc) * sin(d2r * ob);	
		x = cos(d2r * ra);
		x = atan2(y,x);	
		x *= r2d;
		if(x < 0)x += 360;
		pln = x;
		y = asin(sin(d2r * dc) * cos(d2r * ob) - cos(d2r * dc) * sin(d2r * ob) * sin(d2r * ra));
		pla = r2d * y;
	}
}
 
// build string with degrees, minutes, seconds and zodiac sign from longitude
function lon2dmsz(x)
{
	with(Math){
		var d,m,s;
		x = abs(x);
		d = floor(x);
		m = (x - d);
		s = m * 60;
		m = floor(s);
		s = s - m;
		z = floor(d/30);
		d %= 30;
		str = zsign[z] ;
//		+ " " + d + "?" + m + "'" + floor(s * 60) + "\"";	
	}
	return str;
}	
 
// build string with zodiac sign from longitude
function lon2zodiac(x) {
	with(Math) {
		var d,m,s;
		x = abs(x);
		d = floor(x);
		m = (x - d);
		s = m * 60;
		m = floor(s);
		s = s - m;
		z = floor(d/30);
		d %= 30;
		str2 = d + "? " + m + "' " + floor(s * 60) + "\" " + zsign[z];
		
		if (ns4dom) {
			var nsshift = window.innerWidth;
	//		alert ("clientWidth = "+nsshift);
			if (nsshift < 730) {
				nsshift = 730+16;
			}
	//		alert ("if less than 730 make it 730 = "+nsshift);
			nsshift = ((nsshift-730-16)/2)+350;
	//		alert ("clientwidth-730/2+350 = "+nsshift);
			document.layers.div1.moveTo(nsshift,80);		
			document.layers.div1.document.open();
			document.layers.div1.document.write("");
			document.layers.div1.document.close();
		} else {
			var ieshift = document.body.clientWidth;
	//		alert ("clientWidth = "+ieshift);
			if (ieshift < 730) {
				ieshift = 730;
			}
			ieshift = ((ieshift-730)/2)+350;

		}
	}
	return str2;
}	

// calculate Julian Day from Month, Day and Year
 
function mdy2julian(m,d,y)
{
	with(Math){
		im = 12 * (y + 4800) + m - 3;
		j = (2 * (im - floor(im/12) * 12) + 7 + 365 * im)/12;
		j = floor(j) + d + floor(im/48) - 32083;
		if(j > 2299171)j += floor(im/4800) - floor(im/1200) + 38;
		return j;	
	}
}
 
// keep within 360 degrees
 
function fix360(v)
{
	while(v < 0.0)v += 360;
	while(v > 360)v -= 360;
	return v;
}
