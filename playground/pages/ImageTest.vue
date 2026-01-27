<script setup lang="ts">
import { ref } from 'vue';
import { CorpImage } from '@/components/ui/image';

const showLazy = ref(false);
</script>

<template>
  <div class="p-8 space-y-12">
    <div>
      <h1 class="text-3xl font-bold mb-2">CorpImage - Testes</h1>
      <p class="text-muted-foreground">
        Componente de imagem com lazy loading, aspect ratio e customização
      </p>
    </div>

    <!-- SIZES -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Sizes</h2>
      <div class="flex items-end gap-4 flex-wrap">
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">small (96x96)</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=1"
            alt="Small image"
            size="small"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">regular (160x160)</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=2"
            alt="Regular image"
            size="regular"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">large (256x256)</p>
          <CorpImage
            src="https://picsum.photos/300/300?random=3"
            alt="Large image"
            size="large"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">auto (original)</p>
          <CorpImage
            src="https://picsum.photos/150/100?random=4"
            alt="Auto size image"
            size="auto"
          />
        </div>
      </div>
    </section>

    <!-- SHAPES -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Shapes</h2>
      <div class="flex items-center gap-4 flex-wrap">
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">square</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=5"
            alt="Square image"
            shape="square"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">rounded</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=6"
            alt="Rounded image"
            shape="rounded"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">circle</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=7"
            alt="Circle image"
            shape="circle"
          />
        </div>
      </div>
    </section>

    <!-- OBJECT FIT -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Object Fit</h2>
      <p class="text-sm text-muted-foreground mb-4">
        Mesma imagem 400x200 em container 160x160 (veja a diferença!)
      </p>
      <div class="flex items-center gap-4 flex-wrap">
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">cover (padrão)</p>
          <CorpImage
            src="https://picsum.photos/400/200?random=8"
            alt="Cover fit"
            fit="cover"
            shape="rounded"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">contain</p>
          <CorpImage
            src="https://picsum.photos/400/200?random=8"
            alt="Contain fit"
            fit="contain"
            shape="rounded"
            class="bg-muted"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">fill</p>
          <CorpImage
            src="https://picsum.photos/400/200?random=8"
            alt="Fill fit"
            fit="fill"
            shape="rounded"
          />
        </div>
      </div>
    </section>

    <!-- OBJECT POSITION -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Object Position</h2>
      <p class="text-sm text-muted-foreground mb-4">
        Mesma imagem 400x200 com fit="cover" (veja onde a imagem é cortada!)
      </p>
      <div class="flex items-center gap-4 flex-wrap">
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">center</p>
          <CorpImage
            src="https://picsum.photos/400/200?random=11"
            alt="Center position"
            position="center"
            shape="rounded"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">top</p>
          <CorpImage
            src="https://picsum.photos/400/200?random=11"
            alt="Top position"
            position="top"
            shape="rounded"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">bottom</p>
          <CorpImage
            src="https://picsum.photos/400/200?random=11"
            alt="Bottom position"
            position="bottom"
            shape="rounded"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">left</p>
          <CorpImage
            src="https://picsum.photos/400/200?random=11"
            alt="Left position"
            position="left"
            shape="rounded"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">right</p>
          <CorpImage
            src="https://picsum.photos/400/200?random=11"
            alt="Right position"
            position="right"
            shape="rounded"
          />
        </div>
      </div>
    </section>

    <!-- BORDER COLOR -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Border Color + Width</h2>
      <div class="flex items-center gap-4 flex-wrap">
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">primary (3px)</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=16"
            alt="Primary border"
            borderColor="primary"
            borderWidth="3px"
            shape="rounded"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">secondary (3px)</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=17"
            alt="Secondary border"
            borderColor="secondary"
            borderWidth="3px"
            shape="rounded"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">success (3px)</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=18"
            alt="Success border"
            borderColor="success"
            borderWidth="3px"
            shape="rounded"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">custom #ff0000 (4px)</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=19"
            alt="Custom border"
            borderColor="#ff0000"
            borderWidth="4px"
            shape="circle"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">só width, sem cor (5px)</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=20"
            alt="Border width only"
            borderWidth="5px"
            shape="rounded"
          />
        </div>
      </div>
    </section>

    <!-- ASPECT RATIO -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Aspect Ratio</h2>
      <p class="text-sm text-muted-foreground mb-4">
        Previne CLS (Cumulative Layout Shift)
      </p>
      <div class="flex items-start gap-4 flex-wrap">
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">16/9 (width: 320px)</p>
          <CorpImage
            src="https://picsum.photos/640/360?random=20"
            alt="16/9 aspect"
            :width="320"
            aspectRatio="16/9"
            shape="rounded"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">4/3 (width: 320px)</p>
          <CorpImage
            src="https://picsum.photos/400/300?random=21"
            alt="4/3 aspect"
            :width="320"
            aspectRatio="4/3"
            shape="rounded"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">1/1 (width: 200px)</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=22"
            alt="1/1 aspect"
            :width="200"
            aspectRatio="1/1"
            shape="rounded"
          />
        </div>
      </div>
    </section>

    <!-- VISUAL EFFECTS -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Visual Effects</h2>
      <div class="flex items-center gap-4 flex-wrap">
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">shadow</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=23"
            alt="Shadow image"
            shadow
            shape="rounded"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">grayscale</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=24"
            alt="Grayscale image"
            grayscale
            shape="rounded"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">shadow + grayscale</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=25"
            alt="Shadow + grayscale"
            shadow
            grayscale
            shape="rounded"
          />
        </div>
      </div>
    </section>

    <!-- CUSTOM ROUNDED -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Custom Rounded</h2>
      <div class="flex items-center gap-4 flex-wrap">
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">rounded="none"</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=26"
            alt="No rounded"
            rounded="none"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">rounded="sm"</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=27"
            alt="Small rounded"
            rounded="sm"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">rounded="lg"</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=28"
            alt="Large rounded"
            rounded="lg"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">rounded="full"</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=29"
            alt="Full rounded"
            rounded="full"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">rounded=32 (32px)</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=30"
            alt="Custom 32px rounded"
            :rounded="32"
          />
        </div>
      </div>
    </section>

    <!-- CUSTOM DIMENSIONS -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Custom Dimensions</h2>
      <div class="flex items-end gap-4 flex-wrap">
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">width: 100px</p>
          <CorpImage
            src="https://picsum.photos/200/200?random=31"
            alt="100px width"
            :width="100"
            shape="rounded"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">
            width: 200px, height: 150px
          </p>
          <CorpImage
            src="https://picsum.photos/400/300?random=32"
            alt="200x150"
            :width="200"
            :height="150"
            shape="rounded"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">
            width: "100%", maxWidth: 300px
          </p>
          <div class="w-full max-w-[300px]">
            <CorpImage
              src="https://picsum.photos/600/400?random=33"
              alt="Responsive width"
              width="100%"
              aspectRatio="16/9"
              shape="rounded"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- LAZY LOADING -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Lazy Loading</h2>
      <p class="text-sm text-muted-foreground mb-4">
        Rola a página para baixo para ver as imagens carregarem
      </p>

      <button
        @click="showLazy = !showLazy"
        class="px-4 py-2 bg-primary text-primary-foreground rounded-md"
      >
        {{ showLazy ? 'Esconder' : 'Mostrar' }} imagens lazy (simula scroll)
      </button>

      <div v-if="showLazy" class="grid grid-cols-3 gap-4">
        <CorpImage
          v-for="i in 9"
          :key="i"
          :src="`https://picsum.photos/300/300?random=${40 + i}`"
          :alt="`Lazy image ${i}`"
          lazy
          shape="rounded"
          class="w-full"
        />
      </div>
    </section>

    <!-- USE CASES -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Use Cases Comuns</h2>

      <div class="space-y-8">
        <!-- Avatar -->
        <div>
          <h3 class="text-lg font-medium mb-3">Avatar Profile</h3>
          <div class="flex items-center gap-3">
            <CorpImage
              src="https://picsum.photos/200/200?random=50"
              alt="User avatar"
              size="small"
              shape="circle"
              borderColor="primary"
              class="!border-2"
            />
            <div>
              <p class="font-semibold">João Silva</p>
              <p class="text-sm text-muted-foreground">
                Desenvolvedor Frontend
              </p>
            </div>
          </div>
        </div>

        <!-- Product Card -->
        <div>
          <h3 class="text-lg font-medium mb-3">Product Card</h3>
          <div class="w-64 border rounded-lg overflow-hidden">
            <CorpImage
              src="https://picsum.photos/400/300?random=51"
              alt="Product"
              width="100%"
              aspectRatio="4/3"
              fit="cover"
            />
            <div class="p-4">
              <h4 class="font-semibold">Nome do Produto</h4>
              <p class="text-sm text-muted-foreground">R$ 99,90</p>
            </div>
          </div>
        </div>

        <!-- Gallery -->
        <div>
          <h3 class="text-lg font-medium mb-3">Gallery Grid</h3>
          <div class="grid grid-cols-4 gap-2">
            <CorpImage
              v-for="i in 8"
              :key="i"
              :src="`https://picsum.photos/300/300?random=${60 + i}`"
              :alt="`Gallery image ${i}`"
              width="100%"
              aspectRatio="1/1"
              shape="rounded"
              fit="cover"
              class="cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        </div>

        <!-- Banner -->
        <div>
          <h3 class="text-lg font-medium mb-3">Hero Banner</h3>
          <CorpImage
            src="https://picsum.photos/1200/400?random=70"
            alt="Hero banner"
            width="100%"
            aspectRatio="16/5"
            shape="rounded"
            fit="cover"
            shadow
          />
        </div>
      </div>
    </section>
  </div>
</template>
