// From https://www.shadertoy.com/view/MfcGzB
// Credits to SentientCymatic and bitless
// Original: https://www.shadertoy.com/view/fstyD4
// Bioluminescence


#define p(t,a,b,c,d)(a+b*cos(6.28318*(c*t+d)))
#define sp(t)p(t,vec3(.26,.76,.77),vec3(1,.3,1),vec3(.8,.4,.7),vec3(0,.12,.54))
#define hue(v)(.6+.76*cos(6.3*(v)+vec4(0,23,21,0)))
float h12(vec2 p){vec3 p3=fract(vec3(p.xyx)*.01);p3+=dot(p3,p3.yzx+33.11);return fract((p3.x+p3.y)*p3.z);}
vec2 h22(vec2 p){vec3 p3=fract(vec3(p.xyx)*vec3(.1031,.103,.0973));p3+=dot(p3,p3.yzx+33.11);return fract((p3.xx+p3.yz)*p3.zy);}
vec2 r2D(vec2 st,float a){return mat2(cos(a),-sin(a),sin(a),cos(a))*st;}
float st(float a,float b,float s){return smoothstep(a-s,a+s,b);}
float n(vec2 p){vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*(3.-2.*f);return mix(mix(dot(h22(i+vec2(0,0)),f-vec2(0,0)),dot(h22(i+vec2(1,0)),f-vec2(1,0)),u.x),mix(dot(h22(i+vec2(0,1)),f-vec2(0,1)),dot(h22(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);}
void mainImage(out vec4 O,in vec2 g){vec2 r=iResolution.xy,uv=(g+g-r)/r.y,sun=vec2(r.x/r.y*.42,-.53),tree=vec2(-r.x/r.y*.42,-.2),sh,u,id,lc,t;vec3 f,c;float xd,yd,h,a,l;vec4 C;float sm=3./r.y;sh=r2D(sun,n(uv+iTime*.25)*.3);if(uv.y>-.4){u=uv+sh;yd=75.;id=vec2((length(u)+.01)*yd,0);xd=floor(id.x)*.1;h=(h12(floor(id.xx))*.15+.15)*(iTime+10.)*-.1;t=r2D(u,-h);id.y=atan(t.y,t.x)*xd;lc=fract(id);id-=lc;t=vec2(cos((id.y+.5)/xd)*(id.x+.5)/yd,sin((id.y+.5)/xd)*(id.x+.5)/yd);t=r2D(t,-h)-sh;h=n(t*vec2(.5,1)-vec2(iTime*.2,0))*step(-.25,t.y);h=smoothstep(.052,.055,h);lc+=(n(lc*vec2(1,4)+id))*vec2(.7,.2);f=mix(sp(sin(length(u)-.1))*.3,mix(sp(sin(length(u)-.1)+(h12(id)-.5)*.35),vec3(1),h),st(abs(lc.x-.5),.4,sm*yd)*st(abs(lc.y-.5),.48,sm*xd));}if(uv.y<-.35){float cld=n(-sh*vec2(.5,1)-vec2(iTime*.2,0));cld=1.-smoothstep(.0,.15,cld)*.5;u=uv*vec2(1,15);id=floor(u);for(float i=1.;i>-1.;i--){if(id.y+i<-5.){lc=fract(u)-.5;lc.y=(lc.y+(sin(uv.x*12.-iTime*3.+id.y+i))*.25-i)*4.;h=h12(vec2(id.y+i,floor(lc.y)));xd=6.+h*4.;yd=30.;lc.x=uv.x*xd+sh.x*8.;lc.x+=sin(iTime*(.5+h*2.))*.5;h=.8*smoothstep(5.,.0,abs(floor(lc.x)))*cld+.1;f=mix(f,mix(vec3(0,.15,.9),vec3(.25,.1,0),h),st(lc.y,0.,sm*yd));lc+=n(lc*vec2(3,.5))*vec2(.1,.6);f=mix(f,mix(hue(h12(floor(lc))*.1+.56).rgb*(1.2+floor(lc.y)*.17),vec3(1,1,0),h),st(lc.y,0.,sm*xd)*st(abs(fract(lc.x)-.5),.48,sm*xd)*st(abs(fract(lc.y)-.5),.3,sm*yd));}}}O=vec4(f,1);a=0.;u=uv+n(uv*2.)*.1+vec2(0,sin(uv.x*1.75+2.)*.10+.75);float angle=atan(u.x,u.y);vec3 noiseColor=vec3(sin(angle+iTime*1.0),sin(angle+iTime*1.0+2.094),sin(angle+iTime*1.0+4.188));vec3 rainbowColor=vec3(0.5+0.5*noiseColor.r,0.5+0.5*noiseColor.g,0.5+0.5*noiseColor.b);xd=90.0;u=u*vec2(xd,xd/3.5);if(u.y<1.2){for(float y=0.;y>-3.;y--){for(float x=-2.;x<3.;x++){id=floor(u)+vec2(x,y);lc=(fract(u)+vec2(1.-x,-y))/vec2(5,3);h=(h12(id)-0.5)*0.25+0.5;lc-=vec2(0.3,0.5-h*0.4);lc.x+=sin(((iTime*1.7+h*2.-id.x*0.05-id.y*0.05)*1.1+id.y*0.5)*2.)*(lc.y+0.5)*0.5;t=abs(lc)-vec2(0.02,0.5-h*0.5);l=length(max(t,0.))+min(max(t.x,t.y),0.);vec3 hueShift=vec3(sin((uv.x+iTime*0.2)*5.0),sin((uv.x+iTime*0.2+2.094)*5.0),sin((uv.x+iTime*0.2+4.188)*5.0));hueShift+=vec3(sin((uv.y+iTime*0.1)*10.0)*0.1,sin((uv.y+iTime*0.1+1.047)*10.0)*0.1,sin((uv.y+iTime*0.1+2.094)*10.0)*0.1);vec3 bladeColor=vec3(0.5+0.5*noiseColor.r+0.25*hueShift.r,0.5+0.5*noiseColor.g+0.25*hueShift.g,0.5+0.5*noiseColor.b+0.25*hueShift.b);C=vec4(bladeColor*0.25,st(l,0.1,sm*xd*0.1));C=mix(C,vec4(bladeColor*(1.2+lc.y*2.)*(1.8-h*2.5),1.),st(l,0.04,sm*xd*0.09));O=mix(O,C,C.a*step(id.y,-1.));a=max(a,C.a*step(id.y,-5.));}}}float T=sin(iTime*0.5);if(abs(uv.x+tree.x-0.1-T*0.1)<0.6){u=uv+tree;u.x-=sin(u.y+1.0)*0.2*(T+0.75);u+=n(u*4.5-20.0)*0.25;float xd=10.0;float yd=60.0;vec2 t=u*vec2(1.0,yd);float h=h12(floor(t.yy));t.x+=h*0.01;t.x*=xd;vec2 lc=fract(t);float m=st(abs(t.x-0.5),0.5,sm*xd)*step(abs(t.y+20.0),45.0);vec4 C=mix(vec4(0.07),vec4(0.5,0.3,0,1)*(0.4+h*0.4),st(abs(lc.y-0.5),0.4,sm*yd)*st(abs(lc.x-0.5),0.45,sm*xd));C.a=m;xd=45.0;yd=15.0;for(float xs=0.0;xs<4.0;xs++){u=uv+tree+vec2(xs/xd*0.5-(T+0.75)*0.15,-0.9);u+=n(u*vec2(2.0,1.0)+vec2(-iTime+xs*0.05,0.0))*vec2(-0.25,0.1)*smoothstep(0.5,-1.0,u.y+0.7)*0.75;t=u*vec2(xd,1.3);h=h12(floor(t.xx)+xs*1.4);yd=5.0+h*9.0;t.y*=yd;vec2 sh=t;lc=fract(t);h=h12(t-lc);t=(t-lc)/vec2(xd,yd)+vec2(0.01,0.9);m=(step(0.0,t.y)*step(length(t),0.5)+step(t.y,0.0)*step(-0.7+sin((floor(u.x)+xs*1.0)*50.0)*1.0,t.y))*step(abs(t.x),0.75)*st(abs(lc.x-0.5),0.35,sm*xd*0.5);lc+=n(sh)*vec2(0.2,0.2);vec3 prevF=hue((fract(h+(sin(iTime*0.15)*0.15+0.15)))*0.8).rgb-t.x;vec3 nextF=hue((fract(h+(sin(iTime*0.15)*0.15+0.15)))*0.8).rgb-t.x;vec3 f=mix(prevF,nextF,0.9);C=mix(C,vec4(mix(f*0.15,f*0.6*(0.7+xs*0.2),st(abs(lc.y-0.5),0.47,sm*yd)*st(abs(lc.x-0.5),0.2,sm*xd)),m),m);}O=mix(O,C,C.a*(1.0-a));}}
