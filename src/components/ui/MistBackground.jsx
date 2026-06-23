import { useEffect, useRef } from 'react';

export default function MistBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; const gl = canvas?.getContext('webgl'); if (!gl) return;
    const shader = (type, source) => { const value = gl.createShader(type); gl.shaderSource(value, source); gl.compileShader(value); return value; };
    const vertex = 'attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}';
    const fragment = `precision highp float;uniform float t;uniform vec2 r;float h(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1)),f.x),f.y);}float f(vec2 p){float v=0.,a=.5;for(int i=0;i<6;i++){v+=a*n(p);p*=2.;a*=.5;}return v;}void main(){vec2 uv=gl_FragCoord.xy/r.xy;uv.x*=r.x/r.y;vec2 q=vec2(f(uv+.035*t),f(uv+vec2(1)));vec2 w=vec2(f(uv+q+vec2(1.7,9.2)+.06*t),f(uv+q+vec2(8.3,2.8)+.05*t));float z=f(uv+w);vec3 c=mix(vec3(.025,.035,.05),vec3(.18,.22,.27),z);c=mix(c,vec3(.34,.4,.48),dot(q,w)*.36);gl_FragColor=vec4(c,1.);}`;
    const program = gl.createProgram(); gl.attachShader(program, shader(gl.VERTEX_SHADER, vertex)); gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragment)); gl.linkProgram(program); gl.useProgram(program);
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW); const position = gl.getAttribLocation(program, 'position'); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
    const time = gl.getUniformLocation(program,'t'); const resolution = gl.getUniformLocation(program,'r'); let frame;
    const render = now => { const ratio = Math.min(devicePixelRatio || 1, 1.5); const width = Math.floor(canvas.clientWidth * ratio); const height = Math.floor(canvas.clientHeight * ratio); if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;gl.viewport(0,0,width,height);} gl.uniform1f(time,now*.001);gl.uniform2f(resolution,width,height);gl.drawArrays(gl.TRIANGLES,0,6);frame=requestAnimationFrame(render); };
    frame=requestAnimationFrame(render); return()=>{cancelAnimationFrame(frame);gl.deleteProgram(program);gl.deleteBuffer(buffer);};
  }, []);
  return <canvas className="mist-background" ref={canvasRef} aria-hidden="true" />;
}
