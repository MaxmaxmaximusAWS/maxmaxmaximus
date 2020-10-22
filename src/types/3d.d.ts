import { ReactThreeFiber } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      effectComposer: ReactThreeFiber.Object3DNode<
        EffectComposer,
        typeof EffectComposer
      >
      unrealBloomPass: ReactThreeFiber.Object3DNode<
        UnrealBloomPass,
        typeof UnrealBloomPass
      >
      shaderPass: ReactThreeFiber.Object3DNode<ShaderPass, typeof ShaderPass>
      renderPass: ReactThreeFiber.Object3DNode<RenderPass, typeof RenderPass>
      sSAOPass: ReactThreeFiber.Object3DNode<SSAOPass, typeof SSAOPass>
    }
  }
}
